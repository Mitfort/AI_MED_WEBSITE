import { useEffect, useState } from 'react';
import './App.css';
import IntroAnimation from "./Components/Loading/IntroAnimation";
import Layout from './Components/Main/Layout';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  const handleAnimationComplete = () => {
    setLoadingFinished(true);
  };

  return (
    <AnimatePresence mode='wait'>
      {loadingFinished ? (
        <PageWrapper key="layout">
          <Layout />
        </PageWrapper>
      ) : (
        <PageWrapper key="intro">
          <IntroAnimation onComplete={handleAnimationComplete} />
        </PageWrapper>
      )}
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 3 }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

export default App;
