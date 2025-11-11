import { useState } from 'react';
import LandingPage from './components/LandingPage';
import GridPlotLayout from './components/GridPlotLayout';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'layout'>('landing');

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage onViewLayout={() => setCurrentPage('layout')} />
      ) : (
        <GridPlotLayout onBack={() => setCurrentPage('landing')} />
      )}
    </>
  );
}

export default App;
