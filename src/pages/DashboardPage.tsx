import React from 'react';
import KeyMetricsSection from '../components/sections/KeyMetricsSection';
import DocumentsSection from '../components/sections/DocumentsSection';
import ChartsSection from '../components/sections/ChartsSection';
import AnalysisSection from '../components/sections/AnalysisSection';
import NextStepsSection from '../components/sections/NextStepsSection';
import RecommendationSection from '../components/sections/RecommendationSection';
import { SectionVisibility } from '../components/layout/PrintSettingsModal';

interface DashboardPageProps {
  sectionsVisibility: SectionVisibility;
  onOpenPrintModal: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ sectionsVisibility, onOpenPrintModal }) => {
  return (
    <div className="container mx-auto space-y-8">
      {sectionsVisibility.keyMetrics && <KeyMetricsSection />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {sectionsVisibility.charts && <ChartsSection />}
          {sectionsVisibility.analysis && <AnalysisSection />}
        </div>
        <div className="lg:col-span-1 space-y-8">
          {sectionsVisibility.documents && <DocumentsSection />}
          {sectionsVisibility.nextSteps && <NextStepsSection />}
        </div>
      </div>

      {sectionsVisibility.recommendation && <RecommendationSection onOpenPrintModal={onOpenPrintModal} />}

      <footer className="text-center text-sm text-muted-foreground py-8">
        <p>Outil 23 - Compte rendu intermédiaire de mission</p>
        <p>Généré le {new Date().toLocaleDateString('fr-FR')}</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
