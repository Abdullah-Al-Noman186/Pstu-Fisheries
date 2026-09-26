"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { FaFish, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      const msg = err?.code === "auth/invalid-credential"
        ? "Invalid email or password"
        : err?.code === "auth/too-many-requests"
        ? "Too many attempts. Try again later."
        : "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="/logo.png" alt="PSTU Logo" width={56} height={56} className="rounded-full object-cover transition-all" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Faculty of Fisheries</h1>
          <p className="text-ocean-200 text-sm mt-1">PSTU — Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="font-display font-bold text-ocean-900 text-xl mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Your password" required
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-ocean-600 hover:text-ocean-800 font-medium">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-ocean-700 hover:bg-ocean-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 text-sm">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs text-gray-400"><span className="bg-white px-3">or continue with</span></div>
          </div>

          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-all text-sm">
            <FcGoogle className="text-2xl" /> Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-ocean-600 hover:text-ocean-800 font-medium">Register here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}