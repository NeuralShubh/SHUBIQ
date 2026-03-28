import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Projects from "./components/Projects"
import Ecosystem from "./components/Ecosystem"
import Marquee from "./components/Marquee"
import Contact from "./components/Contact"
import GoldLine from "./components/GoldLine"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  )
}
