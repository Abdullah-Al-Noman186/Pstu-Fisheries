"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaFish,
  FaGraduationCap,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";


type TeamMember = {
  name: string;
  nameBn?: string;
  batch: string;
  session: string;
  studentId: string;
  registration: string;
  initials: string;
  photo: string;
  profileStatus: string;
  presentStatus: string;
  gender?: string;
  dateOfBirth?: string;
  degree?: string;
  position?: string;
  organization?: string;
  department?: string;
  workLocation?: string;
  email: string;
  phone: string;
  address: string;
};

const websiteTeam: TeamMember[] = [
  {
    name: "Abdullah-Al-Hasan",
    nameBn: "আবদুল্লাহ আল হাসান (মাকনুন)",
    batch: "1st batch",
    session: "2007–08",
    studentId: "0704006",
    registration: "01729",
    initials: "AH",
    photo: "https://drive.google.com/uc?export=view&id=13jrphjpWrIENKLbzoAngKHXcItoC3Z3S",
    profileStatus: "Alumni",
    presentStatus: "Job holder",
    degree: "MS",
    position: "Associate Professor",
    organization: "Patuakhali Science and Technology University",
    department: "Dept. of Marine Fisheries and Oceanography",
    email: "a.a.hasan13@gmail.com",
    phone: "01715544613",
    address: "Barisal Sadar, Barishal",
  },
  {
    name: "Abdullah Al Noman",
    batch: "16th batch",
    session: "2022–23",
    studentId: "2204004",
    registration: "11379",
    initials: "AN",
    photo: "/abdullah-al-noman.webp",
    nameBn: "Abdullah Al Noman",
    profileStatus: "Current student",
    presentStatus: "Running Students",
    gender: "Male",
    dateOfBirth: "05/13/2005",
    position: "Student",
    organization: "Patuakhali Science And Technology University",
    workLocation: "Dumki, Patuakhali",
    email: "nabdullah273@gmail.com",
    phone: "01850495118",
    address: "Dhanbari, Tangail, Dhaka",
  },
];

export default function BehindThisWebsitePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-0 h-[34rem] w-[34rem] rounded-full bg-[#2DD4BF]/10 blur-[120px]" />
        <div className="absolute -right-48 top-48 h-[34rem] w-[34rem] rounded-full bg-[#087EA4]/[0.08] blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#075985 1px, transparent 1px), linear-gradient(90deg, #075985 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      <section className="relative border-b border-[#087EA4]/10 px-4 pb-14 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#087EA4]/15 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#087EA4] shadow-sm">
            <FaFish size={11} />
            Faculty of Fisheries · PSTU
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-bold leading-tight tracking-tight text-[#075985] sm:text-5xl lg:text-6xl">
            The people behind
            <span className="block bg-gradient-to-r from-[#087EA4] via-[#0891B2] to-[#2DD4BF] bg-clip-text text-transparent">
              our community.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base">
            This website brings together the students, alumni, and faculty of
            Fisheries at Patuakhali Science and Technology University. The
            community is what makes it useful, current, and worth returning to.
          </p>
        </motion.div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <div className="mb-7 max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#087EA4]">Website contributors</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#123B4A] sm:text-3xl">
                The people behind this website
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#55727D]">
                Built by members of the Faculty of Fisheries community at PSTU.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {websiteTeam.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/95 shadow-[0_14px_42px_rgba(7,89,133,0.07)]"
                >
                  <div className="flex items-center gap-4 bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] p-5 text-white sm:p-6">
                    <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-2xl border-2 border-white/60 bg-white/15 shadow-lg">
                      <Image src={member.photo} alt={member.name} fill sizes="88px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/75">Website contributor</p>
                      <h3 className="mt-1 break-words font-display text-lg font-bold leading-tight sm:text-xl">{member.name}</h3>
                      {member.nameBn && <p lang="bn" className="mt-1 text-sm text-white/85">{member.nameBn}</p>}
                      <p className="mt-2 text-xs font-semibold text-white/85">{member.profileStatus}</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Batch", member.batch],
                        ["Session", member.session],
                        ["Student ID", member.studentId],
                        ["Registration", member.registration],
                        ["Present status", member.presentStatus],
                        ...(member.gender ? [["Gender", member.gender]] : []),
                        ...(member.dateOfBirth ? [["Date of birth", member.dateOfBirth]] : []),
                        ...(member.degree ? [["Degree", member.degree]] : []),
                        ...(member.position ? [["Position", member.position]] : []),
                        ...(member.organization ? [["Organization", member.organization]] : []),
                        ...(member.department ? [["Department", member.department]] : []),
                        ...(member.workLocation ? [["Work location", member.workLocation]] : []),
                      ].map(([label, value]) => (
                        <div key={label} className="min-w-0 rounded-xl border border-[#087EA4]/10 bg-[#F7FCFD] px-3 py-2.5">
                          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#78939C]">{label}</p>
                          <p className="mt-1 break-words text-xs font-semibold leading-5 text-[#123B4A]">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2 border-t border-[#087EA4]/10 pt-4 text-sm">
                      <a href={`mailto:${member.email}`} className="block break-all font-medium text-[#087EA4] hover:underline">{member.email}</a>
                      <a href={`tel:${member.phone}`} className="block font-medium text-[#123B4A] hover:text-[#087EA4]">{member.phone}</a>
                      <p className="text-xs leading-5 text-[#55727D]">{member.address}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          
        </div>
      </section>
    </main>
  );
}
