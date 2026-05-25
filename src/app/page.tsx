import type { Metadata } from "next"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Projects from "./components/Projects"
import TechConfidence from "./components/TechConfidence"
import Ecosystem from "./components/Ecosystem"
import Marquee from "./components/Marquee"
import Contact from "./components/Contact"
import GoldLine from "./components/GoldLine"
import Footer from "./components/Footer"

import { SERVICES, ECOSYSTEM_ITEMS } from "./data"
import { projects } from "./data-projects"

export const metadata: Metadata = {
  title: "NexGravision | Intelligence That Wins",
  description:
    "NexGravision is a premium digital engineering brand crafting high-performance web platforms, productivity apps, and intelligent systems.",
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <GoldLine />
        <About />
        <GoldLine />
        <Services initialServices={SERVICES} />
        <GoldLine />
        <Projects initialProjects={projects} />
        <GoldLine />
        <TechConfidence />
        <GoldLine />
        <Marquee />
        <GoldLine />
        <Ecosystem initialEcosystem={ECOSYSTEM_ITEMS} />
        <GoldLine />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

