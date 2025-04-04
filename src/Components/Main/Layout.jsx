import { useState } from "react";
import About from "./About";
import Contact from "./Contact";
import DNA from "./DNA";
import Projects from "./Projects";
import Recrutation from "./Recrutation";
import { motion } from "framer-motion";
import React from "react";

export default function Layout() {
  const componentList = [Contact, About, Projects, Recrutation];
  const [activeComponent, setActiveComponent] = useState(null);
  const [splitAnimationFinished, setSplitAnimationFinished] = useState(false);

  return (
    <div className="layout">
      <header></header>
      <main>
        {activeComponent === null ? (
          <DNA
            listSize={componentList.length}
            onSelect={(index) => {
              setTimeout(() => {
                setActiveComponent(index);
                setSplitAnimationFinished(true);
              }, 2000); // Wait for DNA split animation
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {componentList[activeComponent] &&
              React.createElement(componentList[activeComponent])}
          </motion.div>
        )}
      </main>
      <footer></footer>
    </div>
  );
}
