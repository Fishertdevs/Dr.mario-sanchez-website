import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Topics from "@/components/sections/Topics";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <main>
        <Hero />
        <Topics />
        <About />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton phone="573143127513" />
    </div>
  );
}
