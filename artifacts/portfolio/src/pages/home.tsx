import { useState } from "react";
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

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <main>
        <Hero />
        <Topics />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <CookieBanner />
      <WhatsAppButton phone="573143127513" />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
