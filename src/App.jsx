// App.jsx
import { useState, useEffect } from "react";
import IntroAnimation from "./Components/Loading/IntroAnimation";
import Layout from "./Components/Main/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Projects from "./Components/Pages/Projects";
import Recrutation from "./Components/Pages/Recrutation";
import { invalidate } from "@react-three/fiber";

function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    if (loadingFinished) {
      const forceCanvasReset = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
          context && context.reset();
        }
      };
  
      requestAnimationFrame(() => {
        invalidate();
        forceCanvasReset();
        window.dispatchEvent(new Event('resize'));
      });
    }
  }, [loadingFinished]);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loadingFinished? (
          <PageWrapper key="layout">
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/recrutation" element={<Recrutation />} />
            </Routes>
          </PageWrapper>
        ) : (
          <PageWrapper key="intro">
          <IntroAnimation onComplete={() => setLoadingFinished(true)} />
          </PageWrapper>
        )}
      </AnimatePresence>
    </Router>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 3 }}
      style={{ width: "100%", height: "100%" , pointerEvents: 'auto'}}
    >
      {children}
    </motion.div>
  );
}

export default App;
