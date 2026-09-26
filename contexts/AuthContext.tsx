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
  signInWithPopup, signOut as firebaseSignOut,
  onAuthStateChanged, User as FirebaseUser
} from "firebase/auth";
import { User } from "@/types";
import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "teacher" | "alumni" | "student";
  department?: string;
  studentId?: string;
  batch?: number;
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (data: RegisterData) => Promise<void>;
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
            name:       profile.name       || data.user.name,
            department: profile.department || data.user.department,
          });
        } else {
          setUser(data.user);
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

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (
        error?.code === "auth/cancelled-popup-request" ||
        error?.code === "auth/popup-closed-by-user"
      ) return;
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (data: RegisterData) => {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await updateProfile(cred.user, { displayName: data.name });
    const token = await cred.user.getIdToken();
    await axios.post("/api/auth/register", { token, ...data });
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