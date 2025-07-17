import React from 'react';
import KeyMetricsSection from '../components/sections/KeyMetricsSection';
import DocumentsSection from '../components/sections/DocumentsSection';
import ChartsSection from '../components/sections/ChartsSection';
import AnalysisSection from '../components/sections/AnalysisSection';
import NextStepsSection from '../components/sections/NextStepsSection';
import RecommendationSection from '../components/sections/RecommendationSection';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto space-y-8">
      <KeyMetricsSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <ChartsSection />
          <AnalysisSection />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <DocumentsSection />
          <NextStepsSection />
        </div>
      </div>

      <RecommendationSection />

      <footer className="text-center text-sm text-muted-foreground py-8">
        <p>Outil 23 - Compte rendu intermédiaire de mission</p>
        <p>Généré le {new Date().toLocaleDateString('fr-FR')}</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
