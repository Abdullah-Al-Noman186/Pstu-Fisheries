"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);

    await new Promise((r) => setTimeout(r, 1500));

    toast.success("Message sent! We'll respond within 2 business days.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setSending(false);
  };

  const contactItems = [
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      text: "Faculty of Fisheries, PSTU, Dumki, Patuakhali-8602, Bangladesh",
      accent: "text-cyan-300",
      bg: "bg-cyan-400/10",
    },
    {
      icon: FaPhone,
      title: "Phone",
      text: "+880-0441-XXXXXX",
      accent: "text-emerald-300",
      bg: "bg-emerald-400/10",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      text: "fisheries@pstu.ac.bd",
      accent: "text-sky-300",
      bg: "bg-sky-400/10",
    },
    {
      icon: FaClock,
      title: "Office Hours",
      text: "Sunday–Thursday: 9:00 AM – 5:00 PM\nFriday–Saturday: Closed",
      accent: "text-amber-300",
      bg: "bg-amber-400/10",
    },
  ];

  const departments = [
    ["Aquaculture (AQC)", "aqc@pstu.ac.bd"],
    ["Fish. Biology & Genetics (FBG)", "fbg@pstu.ac.bd"],
    ["Fisheries Management (FMN)", "fmn@pstu.ac.bd"],
    ["Fisheries Technology (FST)", "fst@pstu.ac.bd"],
    ["Marine Fisheries & Oceanography (MFO)", "mfo@pstu.ac.bd"],
  ];

  return (
    <main className="pt-20 min-h-screen bg-[#020b18] text-white overflow-hidden relative">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.045] blur-[130px]" />
        <div className="absolute top-[35%] -right-40 h-[520px] w-[520px] rounded-full bg-teal-400/[0.035] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-cyan-400/70" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">
                Faculty of Fisheries • PSTU
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Let&apos;s start a
              <span className="block text-cyan-300">
                conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-400">
              Whether you have a question about our programs, research,
              departments, or academic community, we&apos;re here to help you
              find the right direction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 h-px bg-gradient-to-r from-cyan-400/50 via-white/[0.08] to-transparent"
          />
        </div>
      </section>

      {/* Main content */}
      <section className="relative px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12">
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Section heading */}
              <div className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/60 mb-2">
                  Find us
                </p>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Faculty information
                </h2>
              </div>

              {/* Contact information */}
              <div className="space-y-3">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.06,
                      }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06111f]/75 backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.11] hover:bg-[#071525]"
                    >
                      {/* Hover accent */}
                      <div
                        className={`absolute left-0 top-0 h-full w-px ${item.bg.replace(
                          "/10",
                          "/50"
                        )}`}
                      />

                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] ${item.bg}`}
                        >
                          <Icon className={item.accent} size={15} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1.5">
                            {item.title}
                          </p>

                          <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Department emails */}
              <div className="mt-8">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/60 mb-2">
                      Direct contact
                    </p>

                    <h3 className="font-display text-xl font-bold text-white">
                      Department emails
                    </h3>
                  </div>

                  <FaEnvelope className="text-white/[0.12]" />
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06111f]/70 backdrop-blur-sm">
                  {departments.map(([dept, email], index) => (
                    <div
                      key={email}
                      className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 transition-colors hover:bg-white/[0.025] ${
                        index !== departments.length - 1
                          ? "border-b border-white/[0.05]"
                          : ""
                      }`}
                    >
                      <span className="text-xs sm:text-sm text-slate-400">
                        {dept}
                      </span>

                      <a
                        href={`mailto:${email}`}
                        className="flex items-center gap-2 text-xs font-medium text-cyan-300/75 hover:text-cyan-200 transition-colors"
                      >
                        {email}
                        <FaArrowRight
                          size={9}
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#06111f]/85 backdrop-blur-md shadow-2xl shadow-black/20">
                {/* Form top accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                {/* Ambient glow */}
                <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-cyan-400/[0.035] blur-[90px]" />

                <div className="relative p-6 sm:p-8 lg:p-9">
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/60 mb-2">
                      Send an inquiry
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      Send a message
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      Fill out the form below and the faculty team will get
                      back to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-[11px] uppercase tracking-[0.14em] text-slate-500"
                      >
                        Full name
                      </label>

                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your full name"
                        required
                        className="w-full rounded-xl border border-white/[0.07] bg-[#020b18]/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-[#020b18] focus:ring-1 focus:ring-cyan-400/10"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-[11px] uppercase tracking-[0.14em] text-slate-500"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            email: e.target.value,
                          })
                        }
                        placeholder="your@email.com"
                        required
                        className="w-full rounded-xl border border-white/[0.07] bg-[#020b18]/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-[#020b18] focus:ring-1 focus:ring-cyan-400/10"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block mb-2 text-[11px] uppercase tracking-[0.14em] text-slate-500"
                      >
                        Subject
                      </label>

                      <input
                        id="subject"
                        type="text"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            subject: e.target.value,
                          })
                        }
                        placeholder="Message subject"
                        required
                        className="w-full rounded-xl border border-white/[0.07] bg-[#020b18]/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-[#020b18] focus:ring-1 focus:ring-cyan-400/10"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-[11px] uppercase tracking-[0.14em] text-slate-500"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            message: e.target.value,
                          })
                        }
                        placeholder="Your message..."
                        required
                        rows={6}
                        className="w-full resize-none rounded-xl border border-white/[0.07] bg-[#020b18]/70 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-[#020b18] focus:ring-1 focus:ring-cyan-400/10"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-300/20 bg-cyan-400/[0.09] px-5 py-3.5 text-sm font-medium text-cyan-100 transition-all duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/[0.14] hover:shadow-lg hover:shadow-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                      {sending ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-200/30 border-t-cyan-200" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane
                            size={12}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom statement */}
      <section className="relative border-t border-white/[0.05] px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/50 mb-2">
              Faculty of Fisheries
            </p>

            <p className="text-sm text-slate-500">
              Knowledge flows further when we connect.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            PSTU • Dumki, Patuakhali
          </div>
        </div>
      </section>
    </main>
  );
}