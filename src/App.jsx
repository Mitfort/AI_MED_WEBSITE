import { useState, useEffect } from "react";
import IntroAnimation from "./Components/Loading/IntroAnimation";
import Layout from "./Components/Main/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import { invalidate } from "@react-three/fiber";

function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

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
      <AnimatePresence mode="wait">
        {loadingFinished? (
          <PageWrapper key="layout">
            <BrowserRouter>
              <Layout/>
            </BrowserRouter>  
          </PageWrapper>
        ) : (
          <PageWrapper key="intro" skipAnimation={skipAnimation}>
          <IntroAnimation onComplete={() => setLoadingFinished(true)} onClick={() => setSkipAnimation(true)}/>
          </PageWrapper>
        )}
      </AnimatePresence>
  );
}

function PageWrapper({ children,skipAnimation }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: skipAnimation ? 0.5 : 1.5 } }}
      transition={{ duration: skipAnimation ? 0.5 : 3 }}
      style={{ width: "100%", height: "100%" , pointerEvents: 'auto'}}
    >
      {children}
    </motion.div>
  );
}

export default App;
