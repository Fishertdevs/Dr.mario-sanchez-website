import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Topics from "@/components/sections/Topics";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AdminPanel from "@/components/AdminPanel";

export default function Home({ openAdmin }: { openAdmin?: boolean }) {
  const [adminOpen, setAdminOpen] = useState(openAdmin ?? false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (openAdmin) setAdminOpen(true);
  }, [openAdmin]);

  const handleClose = () => {
    setAdminOpen(false);
    if (openAdmin) navigate("/");
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Topics />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton phone="573143127513" />
      <AdminPanel isOpen={adminOpen} onClose={handleClose} />
    </div>
  );
}
