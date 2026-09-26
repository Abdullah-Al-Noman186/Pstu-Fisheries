"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { FaFish, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword }  = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch {
      toast.error("Could not send reset email. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaFish className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Reset Password</h1>
          <p className="text-ocean-200 text-sm mt-1">Faculty of Fisheries — PSTU</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {sent ? (
            <div className="text-center py-4">
              <FaCheckCircle className="text-teal-500 text-5xl mx-auto mb-4" />
              <h2 className="font-display font-bold text-gray-900 text-xl mb-2">Email Sent!</h2>
              <p className="text-gray-500 text-sm mb-6">
                We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
              </p>
              <Link href="/login" className="text-ocean-600 hover:text-ocean-800 font-medium text-sm">
                ← Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-display font-bold text-ocean-900 text-xl mb-2">Forgot your password?</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your email address and we&apos;ll send you a reset link.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-400 text-sm" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm" />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-ocean-700 hover:bg-ocean-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 text-sm">
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Remember it?{" "}
                <Link href="/login" className="text-ocean-600 hover:text-ocean-800 font-medium">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}