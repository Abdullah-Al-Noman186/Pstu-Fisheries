"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Message sent! We'll respond within 2 business days.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3">Contact Us</motion.h1>
          <p className="text-ocean-200 text-lg">Get in touch with the Faculty of Fisheries, PSTU</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-ocean-900 text-2xl mb-6">Faculty Information</h2>
            <div className="space-y-6 mb-8">
              {[
                { icon: <FaMapMarkerAlt className="text-ocean-600" />, title: "Address",
                  text: "Faculty of Fisheries, PSTU, Dumki, Patuakhali-8602, Bangladesh" },
                { icon: <FaPhone className="text-teal-600" />, title: "Phone", text: "+880-0441-XXXXXX" },
                { icon: <FaEnvelope className="text-ocean-600" />, title: "Email", text: "fisheries@pstu.ac.bd" },
                { icon: <FaClock className="text-amber-600" />, title: "Office Hours",
                  text: "Sunday–Thursday: 9:00 AM – 5:00 PM\nFriday–Saturday: Closed" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-sm whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-ocean-50 rounded-2xl p-5">
              <h3 className="font-display font-bold text-ocean-900 mb-4">Department Emails</h3>
              {[
                ["Aquaculture (AQC)", "aqc@pstu.ac.bd"],
                ["Fish. Biology & Genetics (FBG)", "fbg@pstu.ac.bd"],
                ["Fisheries Management (FMN)", "fmn@pstu.ac.bd"],
                ["Fisheries Technology (FST)", "fst@pstu.ac.bd"],
                ["Marine Fisheries & Oceanography (MFO)", "mfo@pstu.ac.bd"],
              ].map(([dept, email]) => (
                <div key={email} className="flex justify-between items-center py-2 border-b border-ocean-100 last:border-0">
                  <span className="text-sm text-gray-600">{dept}</span>
                  <a href={`mailto:${email}`} className="text-xs text-ocean-600 hover:text-ocean-800 font-medium">{email}</a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="card-fish p-8">
              <h2 className="font-display font-bold text-ocean-900 text-2xl mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { field: "name",    label: "Full Name",      type: "text",  placeholder: "Your full name" },
                  { field: "email",   label: "Email Address",  type: "email", placeholder: "your@email.com" },
                  { field: "subject", label: "Subject",        type: "text",  placeholder: "Message subject" },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input type={type} value={form[field as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      placeholder={placeholder} required
                      className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message..." required rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full btn-ocean flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? "Sending..." : <><FaPaperPlane /> Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}