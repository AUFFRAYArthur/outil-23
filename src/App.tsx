import React from 'react';
import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import Header from './components/layout/Header';
import { SectionVisibility } from './components/layout/PrintSettingsModal';
import PrintSettingsModal from './components/layout/PrintSettingsModal';
import { useSaveLoad } from './hooks/useSaveLoad';

function App() {
  const [sectionsVisibility, setSectionsVisibility] = useState<SectionVisibility>({
    keyMetrics: true,
    charts: true,
    analysis: true,
    documents: true,
    nextSteps: true,
    recommendation: true,
  });

  const [showPrintModal, setShowPrintModal] = useState(false);
  const { exportData, importData } = useSaveLoad();

  const handleUpdatePrintSettings = (newVisibility: SectionVisibility) => {
    setSectionsVisibility(newVisibility);
  };

  const handlePrintConfirmed = (selections: SectionVisibility) => {
    setSectionsVisibility(selections);
    setShowPrintModal(false);
    // Petit délai pour laisser le temps au DOM de se mettre à jour
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header 
        sectionsVisibility={sectionsVisibility}
        onUpdatePrintSettings={handleUpdatePrintSettings}
        showPrintModal={showPrintModal}
        setShowPrintModal={setShowPrintModal}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        <DashboardPage 
          sectionsVisibility={sectionsVisibility} 
          onOpenPrintModal={() => setShowPrintModal(true)}
        />
      </main>
      
      <PrintSettingsModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        initialSelections={sectionsVisibility}
        onPrint={handlePrintConfirmed}
      />
    </div>
  );
}

export default App;
