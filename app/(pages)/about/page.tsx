"use client";
import { motion } from "framer-motion";
import { FaFish, FaEye, FaBullseye, FaHistory } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="bg-ocean-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <FaFish className="text-5xl mx-auto mb-6 text-teal-300" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About the Faculty</h1>
            <p className="text-ocean-200 text-lg leading-relaxed">
              PSTU's Faculty of Fisheries — a beacon of excellence in aquatic science education.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {[
              { icon: <FaEye className="text-ocean-600 text-2xl" />, title: "Our Vision",
                text: "To be a globally recognized center of excellence in fisheries education, research, and innovation, contributing to sustainable aquatic resource management and food security in Bangladesh and beyond." },
              { icon: <FaBullseye className="text-teal-600 text-2xl" />, title: "Our Mission",
                text: "To provide high-quality fisheries education through cutting-edge curriculum, foster research that addresses real-world challenges, and produce graduates who lead transformation in the fisheries sector." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}
                className="bg-ocean-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">{item.icon}</div>
                <h2 className="font-display font-bold text-ocean-900 text-xl mb-3">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="border-l-4 border-ocean-600 pl-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FaHistory className="text-ocean-600 text-xl" />
              <h2 className="font-display font-bold text-ocean-900 text-2xl">Our History</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Faculty of Fisheries at Patuakhali Science and Technology University (PSTU) was established with the vision of advancing fisheries science education in the coastal region of Bangladesh. Located in Dumki, Patuakhali — the heart of Bangladesh's fishing belt — our faculty is uniquely positioned to address the challenges and opportunities of this vital sector.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over the years, we have grown to house five specialized departments: Aquaculture (AQC), Fisheries Biology & Genetics (FBG), Fisheries Management (FMN), Fisheries Technology (FST), and Marine Fisheries & Oceanography (MFO). Our graduates now serve in government agencies, research institutions, the private sector, and NGOs across Bangladesh and internationally.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Excellence", "Sustainability", "Innovation", "Integrity"].map((val, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-ocean-gradient text-white rounded-2xl p-5 text-center">
                <p className="font-display font-bold">{val}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}