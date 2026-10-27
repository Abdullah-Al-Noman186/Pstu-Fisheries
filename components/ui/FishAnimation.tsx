"use client";

import { motion, useReducedMotion } from "framer-motion";

const swimmers = [
  { top: "19%", size: 60, duration: 38, delay: 0, direction: "normal" },
  { top: "53%", size: 42, duration: 46, delay: 11, direction: "reverse" },
  { top: "78%", size: 52, duration: 42, delay: 23, direction: "normal" },
] as const;

function Fish({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.58)}
      viewBox="0 0 100 58"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 29C28 12 54 8 76 21L94 10L90 29L94 48L76 37C54 50 28 46 18 29Z"
        fill="currentColor"
      />
      <path d="M48 19L58 29L48 39" fill="#F0FAFC" fillOpacity=".42" />
      <circle cx="31" cy="25" r="2.4" fill="#075985" />
      <path d="M6 20C11 23 11 35 6 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".45" />
    </svg>
  );
}

export default function FishAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-[#087EA4]"
    >
      {swimmers.map((fish, index) => {
        const from = fish.direction === "reverse" ? "112vw" : "-12vw";
        const to = fish.direction === "reverse" ? "-12vw" : "112vw";

        return (
          <motion.div
            key={index}
            className="absolute left-0 top-0 opacity-[0.075]"
            style={{
              top: fish.top,
              willChange: reduceMotion ? undefined : "transform, opacity",
            }}
            initial={reduceMotion ? false : { x: from, opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0.055 }
                : {
                    x: [from, to],
                    y: [0, -9, 0, 8, 0],
                    opacity: [0, 0.14, 0.14, 0],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    x: {
                      duration: fish.duration,
                      delay: fish.delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: fish.duration,
                      delay: fish.delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }
            }
          >
            <div style={{ transform: fish.direction === "reverse" ? "scaleX(-1)" : undefined }}>
              <Fish size={fish.size} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
