import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Topics from "@/components/sections/Topics";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Topics />
        <Contact />
      </main>
    </div>
  );
}
