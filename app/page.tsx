import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import ProjectsTransition from "@/components/ui/ProjectsTransition";
import Contact from "@/components/ui/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <About />
      <ProjectsTransition />
      <Contact />
    </main>
  );
}
