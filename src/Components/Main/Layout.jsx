import { useLocation, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Projects from "../Pages/Projects";
import Contact from "../Pages/Contact";
import DNA from "./DNA"; 
import About from "../Pages/About";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="background">
      <motion.div
        className="layout"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "95%", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <header className="hero-header">
          <div className="logo">
            <div className="logo-image"></div>
            <div className="logo-text">AIMED</div>
          </div>
          <nav className="navbar">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <button className="contact-button">Contact</button>
        </header>

        <main className="hero-section">
          <div className="dna-background">
            <DNA />
          </div>

          <div className="hero-content">
            <div className="badge">🔓 Unlock the power of AI & ML</div>
            <h1>Osiągnij wiedzę kształtującą przyszłość</h1>
            <p>
              Wspólnie z nami naucz się wykorzystywać AI i uczenie maszynowe w różnych zastosowaniach medycznych i nie tylko
            </p>
            <button className="cta-button">Kontakt ↗</button>
          </div>

          <div className="logos">
            <div className="logo-item">Logoipsum</div>
            <div className="logo-item">Logoipsum</div>
            <div className="logo-item">Logoipsum</div>
            <div className="logo-item">Logoipsum</div>
          </div>
        </main>

        <section id="about">
          <div className="badge">🔸 About us</div>
          <h2>Crafting Tomorrow's <span>Innovative Solutions</span></h2>
          <p>
            We're consistently pushing the boundaries of innovation to create groundbreaking
            solutions that effectively meet today's challenges.
          </p>
        </section>
        <About/>
      </motion.div>
    </div>
  );
}
