import { useLocation, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Projects from "../Pages/Projects";
import Contact from "../Pages/Contact";
import DNA from "./DNA"; 
import About from "../Pages/About";
import Recrutation from "../Pages/Recrutation";

export default function Layout() {
  const location = useLocation();
  const [isNavBarOpen, setNavBarOpen] = useState(false)

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
            <a href="#about" className="nav-link">O Nas</a>
            <a href="#projects" className="nav-link">Projekty</a>
            <a href="#contact" className="nav-link">Kontakt</a>
          </nav>

          <button className="contact-button">Kontakt</button>

          <button 
            className="hamburger-btn" 
            onClick={() => setNavBarOpen(!isNavBarOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </button>

        </header>

        <AnimatePresence>
          {isNavBarOpen && (
            <motion.div
              className="mobile-nav-overlay"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setNavBarOpen(false)}
            >
              <nav className="mobile-nav">
                <a href="#about" onClick={() => {setNavBarOpen(false)}}>About</a>
                <a href="#projects" onClick={() => setNavBarOpen(false)}>Projects</a>
                <a href="#contact" onClick={() => setNavBarOpen(false)}>Contact</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="hero-section">
          <div className="dna-background">
            <DNA />
          </div>

          <div className="hero-content">
            <h1>Osiągnij wiedzę kształtującą przyszłość</h1>
            <p>
              Wspólnie z nami naucz się wykorzystywać AI i uczenie maszynowe w różnych zastosowaniach medycznych i nie tylko
            </p>
            <button className="cta-button">Kontakt ↗</button>
          </div>

          <div className="logos">
            <div className="logo-item">Python</div>
            <div className="logo-item">AI/ML</div>
            <div className="logo-item">Medicine</div>
            <div className="logo-item">Slicer</div>
          </div>
        </main>

        <About/>
        <Projects/>
        <Contact/>
        <Recrutation/>
      </motion.div>
    </div>
  );
}
