import type { Metadata } from "next"
import Navbar from "./components/Navbar"
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

export const metadata: Metadata = {
  title: "SHUBIQ | Intelligence That Wins",
  description:
    "SHUBIQ is a premium digital engineering brand crafting high-performance web platforms, productivity apps, and intelligent systems.",
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="hero-sticky">
          <Hero />
        </div>
        <div className="page-stack">
          <GoldLine />
          <div className="page-stack-body">
            <About />
            <GoldLine />
            <Services />
            <GoldLine />
            <Projects />
            <GoldLine />
            <TechConfidence />
            <GoldLine />
            <Marquee />
            <GoldLine />
            <Ecosystem />
            <GoldLine />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
