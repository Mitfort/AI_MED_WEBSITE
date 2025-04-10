import { useLocation, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Projects from "../Pages/Projects";
import Contact from "../Pages/Contact";
import DNA from "./DNA"; 
import About from "../Pages/About";
import Recrutation from "../Pages/Recrutation";

export default function Layout() {
  const [isNavBarOpen, setNavBarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("");

  const sections = ['about','projects','contact','recrutation'];

  useEffect(() => {
    const handleScroll = () => {
      let closestSection = "";
      let minDistance = Infinity;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (distance < minDistance && rect.top < window.innerHeight) {
            closestSection = id;
            minDistance = distance;
          }
        }
      });

      if (closestSection && closestSection !== activeSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

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
            <a href="#about" className={`nav-link ${activeSection=== 'about' ? 'active-nav' : ''}`}>O Nas</a>
            <a href="#projects" className={`nav-link ${activeSection=== 'projects' ? 'active-nav' : ''}`}>Projekty</a>
            <a href="#contact" className={`nav-link ${activeSection=== 'contact' ? 'active-nav' : ''}`}>Kontakt</a>
            <a href="#recrutation" className={`nav-link ${activeSection=== 'recrutation' ? 'active-nav' : ''}`}>Rekrutacja</a>
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
                <a href="#recrutation" onClick={() => {setNavBarOpen(false)}}>Rekrutacja</a>
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

          <div className="logos-carousel">
            <div className="logos-track">
              {Array(8).fill(["Python", "AI","Machine Learning", "Medicine", "Slicer"]).flat().map((tech, index) => (
                <div key={index} className="logo-item">{tech}</div>
              ))}
            </div>
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
