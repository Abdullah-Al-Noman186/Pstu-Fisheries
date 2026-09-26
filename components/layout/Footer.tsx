import Link from "next/link";
import { FaFish, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

export default function Footer() {
  return (
    <footer className="bg-ocean-950 text-ocean-200">
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full fill-white">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-ocean-gradient rounded-full flex items-center justify-center">
                <FaFish className="text-white" />
              </div>
              <div>
                <p className="text-white font-display font-bold text-sm">Faculty of Fisheries</p>
                <p className="text-ocean-400 text-xs">PSTU, Bangladesh</p>
              </div>
            </div>
            <p className="text-sm text-ocean-400 leading-relaxed mb-5">
              Dedicated to advancing fisheries education, research, and sustainable aquatic resource management.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-ocean-800 flex items-center justify-center text-ocean-300 hover:bg-ocean-600 hover:text-white transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Departments</h4>
            <ul className="space-y-2">
              {deptKeys.map(k => (
                <li key={k}>
                  <Link href={`/departments/${k.toLowerCase()}`}
                    className="text-sm text-ocean-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {DEPARTMENTS[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ["About Faculty",       "/about"],
                ["Faculty Members",     "/teachers"],
                ["Alumni Network",      "/alumni"],
                ["Research Publications","/research"],
                ["News & Events",       "/news"],
                ["Contact Us",          "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ocean-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ocean-600 flex-shrink-0" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-ocean-400">
                <FaMapMarkerAlt className="text-teal-400 mt-1 flex-shrink-0" />
                Faculty of Fisheries, PSTU, Dumki, Patuakhali-8602, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-sm text-ocean-400">
                <FaPhone className="text-teal-400 flex-shrink-0" /> +880-0441-XXXXXX
              </li>
              <li className="flex items-center gap-3 text-sm text-ocean-400">
                <FaEnvelope className="text-teal-400 flex-shrink-0" /> fisheries@pstu.ac.bd
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ocean-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ocean-500">© {new Date().getFullYear()} Faculty of Fisheries, PSTU. All rights reserved.</p>
          <p className="text-xs text-ocean-500">Patuakhali Science and Technology University</p>
        </div>
      </div>
    </footer>
  );
}