import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Topics from "@/components/sections/Topics";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Topics />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
