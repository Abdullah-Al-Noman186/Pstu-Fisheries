"use client";
import { motion } from "framer-motion";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ocean-900">My Profile</h1>
        <p className="text-ocean-500 text-sm mt-1">Update your personal and professional information</p>
      </div>
      <ProfileForm />
    </motion.div>
  );
}