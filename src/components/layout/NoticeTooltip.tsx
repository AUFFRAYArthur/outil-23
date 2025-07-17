import React from 'react';
import { X, Info } from 'lucide-react';

interface NoticeTooltipProps {
  isVisible: boolean;
  onClose: () => void;
}

const NoticeTooltip: React.FC<NoticeTooltipProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold text-gray-900">Guide d'utilisation</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            <strong>Outil 23</strong> est un tableau de bord interactif pour le suivi des projets de transmission d'entreprise en SCOP.
          </p>
          
          <div>
            <p className="font-medium text-gray-700 mb-1">Fonctionnalités principales :</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Cliquez sur les éléments avec l'icône crayon pour les modifier</li>
              <li>Suivez les métriques clés en temps réel</li>
              <li>Analysez les points forts et de vigilance</li>
              <li>Gérez les documents et étapes du projet</li>
              <li>Prenez des décisions éclairées (Go/No Go)</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium text-gray-700 mb-1">Actions disponibles :</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Cas fil rouge :</strong> Charger un exemple complet</li>
              <li><strong>Sauvegarde :</strong> Exporter/importer vos données</li>
              <li><strong>Impression :</strong> Générer un PDF du rapport</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeTooltip;