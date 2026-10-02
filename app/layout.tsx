import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MotionConfig } from "framer-motion";

export const metadata: Metadata = {
  title: "Faculty of Fisheries — PSTU",
  description: "Patuakhali Science and Technology University — Faculty of Fisheries.",
  keywords: "PSTU, fisheries, aquaculture, marine fisheries, Bangladesh",
  applicationName: "PSTU Fisheries Alumni",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "PSTU Fisheries", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F0FAFC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="fisheries">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <MotionConfig reducedMotion="user">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </MotionConfig>
        </AuthProvider>
      </body>
    </html>
  );
}
