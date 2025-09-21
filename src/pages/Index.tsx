import { useState } from "react";
import HomePage from "@/components/HomePage";
import MainApp from "@/components/MainApp";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'app'>('home');

  const handleEnterApp = () => {
    setCurrentView('app');
  };

  const handleGoHome = () => {
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' ? (
        <HomePage onEnterApp={handleEnterApp} />
      ) : (
        <MainApp onGoHome={handleGoHome} />
      )}
    </>
  );
};

export default Index;
