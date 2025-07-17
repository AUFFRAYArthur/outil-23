import React from 'react';
import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import Header from './components/layout/Header';
import { SectionVisibility } from './components/layout/PrintSettingsModal';

function App() {
  const [sectionsVisibility, setSectionsVisibility] = useState<SectionVisibility>({
    keyMetrics: true,
    charts: true,
    analysis: true,
    documents: true,
    nextSteps: true,
    recommendation: true,
  });

  const handleUpdatePrintSettings = (newVisibility: SectionVisibility) => {
    setSectionsVisibility(newVisibility);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header 
        sectionsVisibility={sectionsVisibility}
        onUpdatePrintSettings={handleUpdatePrintSettings}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        <DashboardPage sectionsVisibility={sectionsVisibility} />
      </main>
    </div>
  );
}

export default App;
