"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  auth, googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "@/lib/firebase";
import {
  deleteUser, GoogleAuthProvider, linkWithCredential, signInWithPopup, signOut as firebaseSignOut,
  onAuthStateChanged, User as FirebaseUser
} from "firebase/auth";
import { User } from "@/types";
import axios from "axios";

interface RegisterData {
  name?: string;
  email: string;
  password: string;
  role: "teacher" | "alumni" | "student";
  department?: string;
  studentId: string;
  regNo: string;
  batch?: number;
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  signInWithGoogle: (email: string, password?: string) => Promise<FirebaseUser | null>;
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUser>;
  registerWithEmail: (data: RegisterData) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser]                 = useState<User | null>(null);
  const [loading, setLoading]           = useState(true);

  // ── Core: verify token and get full user+profile from DB ──
  const verifyAndSetUser = async (fbUser: FirebaseUser) => {
    const token = await fbUser.getIdToken(true); // force refresh
    const { data } = await axios.post("/api/auth/verify", { token });
    if (data.success) {
      // Fetch full profile to get latest photo, name, department
      try {
        const profileRes = await axios.get("/api/profile");
        if (profileRes.data.success && profileRes.data.data) {
          const profile = profileRes.data.data;
          setUser({
            ...data.user,
            photo:      profile.photo      || data.user.photo,
            name:       data.user.name     || profile.name || fbUser.displayName || fbUser.email?.split("@")[0],
            department: profile.department || data.user.department,
          });
        } else {
          setUser({
            ...data.user,
            name: fbUser.displayName || data.user.name || fbUser.email?.split("@")[0],
            photo: fbUser.photoURL || data.user.photo,
          });
        }
      } catch {
        setUser(data.user);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try { await verifyAndSetUser(fbUser); }
        catch { setUser(null); }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async (email: string, password?: string) => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      return credential.user;
    } catch (error: any) {
      if (
        error?.code === "auth/cancelled-popup-request" ||
        error?.code === "auth/popup-closed-by-user"
      ) return null;
      if (error?.code === "auth/account-exists-with-different-credential") {
        const pendingCredential = GoogleAuthProvider.credentialFromError(error);
        const accountEmail = String(error?.customData?.email || "").toLowerCase();
        if (!pendingCredential || accountEmail !== email.trim().toLowerCase()) {
          throw new Error("Sign in with the same email address used for your PSTU account.");
        }
        if (!password) throw new Error("Enter your account password once to connect Google sign-in.");
        const existing = await signInWithEmailAndPassword(auth, email, password);
        await linkWithCredential(existing.user, pendingCredential);
        return existing.user;
      }
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  };

  const registerWithEmail = async (data: RegisterData) => {
    const { data: validation } = await axios.post("/api/auth/validate-registration", data);
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    try {
      await updateProfile(cred.user, { displayName: validation.name || data.name || "PSTU User" });
      const token = await cred.user.getIdToken();
      await axios.post("/api/auth/register", { token, ...data, name: validation.name || data.name });
      await axios.post("/api/claim", { studentId: data.studentId, regNo: data.regNo }, { headers: { Authorization: `Bearer ${token}` } });
      await verifyAndSetUser(cred.user);
      return true;
    } catch (error) {
      try { await deleteUser(cred.user); } catch { /* Firebase may require a fresh sign-in to remove the account. */ }
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  // ── refreshUser: called after profile save or photo upload ──
  const refreshUser = async () => {
    if (!firebaseUser) return;
    try {
      await verifyAndSetUser(firebaseUser);
    } catch {
      console.error("Failed to refresh user");
    }
  };

  return (
    <AuthContext.Provider value={{
      firebaseUser, user, loading,
      signInWithGoogle, signInWithEmail,
      registerWithEmail, forgotPassword,
      signOut, refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
