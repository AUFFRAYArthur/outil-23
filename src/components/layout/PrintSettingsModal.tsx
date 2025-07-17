import React, { useState } from 'react';
import { X, Printer, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export interface SectionVisibility {
  keyMetrics: boolean;
  charts: boolean;
  analysis: boolean;
  documents: boolean;
  nextSteps: boolean;
  recommendation: boolean;
}

interface PrintSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelections: SectionVisibility;
  onPrint: (selections: SectionVisibility) => void;
}

const sectionLabels = {
  keyMetrics: 'Métriques clés',
  charts: 'Graphiques (Financement & Engagement)',
  analysis: 'Analyse (Points forts & Vigilance)',
  documents: 'Livrables et données',
  nextSteps: 'Prochaines étapes',
  recommendation: 'Conclusion et recommandation',
};

const PrintSettingsModal: React.FC<PrintSettingsModalProps> = ({
  isOpen,
  onClose,
  initialSelections,
  onPrint,
}) => {
  const [selections, setSelections] = useState<SectionVisibility>(initialSelections);

  const handleToggleSection = (section: keyof SectionVisibility) => {
    setSelections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selections).every(Boolean);
    const newState = !allSelected;
    setSelections({
      keyMetrics: newState,
      charts: newState,
      analysis: newState,
      documents: newState,
      nextSteps: newState,
      recommendation: newState,
    });
  };

  const handlePrint = () => {
    onPrint(selections);
    onClose();
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const allSelected = selectedCount === Object.keys(selections).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Configuration d'impression</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Sélectionnez les sections à inclure dans l'impression :
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-xs"
            >
              {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
            </Button>
          </div>

          <div className="space-y-3">
            {Object.entries(sectionLabels).map(([key, label]) => {
              const isSelected = selections[key as keyof SectionVisibility];
              return (
                <div
                  key={key}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all",
                    isSelected 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  )}
                  onClick={() => handleToggleSection(key as keyof SectionVisibility)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center",
                      isSelected 
                        ? "border-blue-500 bg-blue-500" 
                        : "border-gray-300"
                    )}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{label}</span>
                  </div>
                  {isSelected ? (
                    <Eye className="h-4 w-4 text-blue-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>{selectedCount}</strong> section{selectedCount > 1 ? 's' : ''} sélectionnée{selectedCount > 1 ? 's' : ''} pour l'impression
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handlePrint}
            disabled={selectedCount === 0}
            className="min-w-[120px]"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimer ({selectedCount})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintSettingsModal;