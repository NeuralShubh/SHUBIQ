import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Projects from "./components/Projects"
import Ecosystem from "./components/Ecosystem"
import Marquee from "./components/Marquee"
import Contact from "./components/Contact"
import GoldLine from "./components/GoldLine"

export default function Home() {
  return (
    <main>
      <Hero />
      <GoldLine />
      <About />
      <GoldLine />
      <Services />
      <GoldLine />
      <Projects />
      <GoldLine />
      <Marquee />
      <GoldLine />
      <Ecosystem />
      <GoldLine />
      <Contact />
    </main>
  )
}
