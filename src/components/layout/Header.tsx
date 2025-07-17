import React from 'react';
import { Briefcase, Edit3, Lightbulb, Save, Printer, RotateCcw } from 'lucide-react';
import { projectData, updateProjectData } from '../../data/mockData';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';
import { Button } from '../ui/Button';
import NoticeTooltip from './NoticeTooltip';
import SaveModal from './SaveModal';
import PrintSettingsModal, { SectionVisibility } from './PrintSettingsModal';
import { useSaveLoad } from '../../hooks/useSaveLoad';
import { useFilRouge } from '../../hooks/useFilRouge';

interface HeaderProps {
  sectionsVisibility: SectionVisibility;
  onUpdatePrintSettings: (visibility: SectionVisibility) => void;
}

const Header: React.FC<HeaderProps> = ({ sectionsVisibility, onUpdatePrintSettings }) => {
  const { modalState, openModal, closeModal } = useEditingModal();
  const { exportData, importData } = useSaveLoad();
  const { loadFilRougeData, resetData } = useFilRouge();
  const [showNotice, setShowNotice] = React.useState(false);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const handleEditProject = () => {
    openModal({
      title: 'Modifier les informations du projet',
      description: 'Mettez à jour les informations générales du projet de transmission.',
      fields: [
        {
          key: 'projectName',
          label: 'Nom du projet',
          type: 'text',
          description: 'Nom de l\'entreprise ou du projet de transmission en cours.',
          placeholder: 'Transmission SCOP \'LMC Atlantique\'',
          required: true,
        },
        {
          key: 'editor',
          label: 'Cabinet conseil',
          type: 'text',
          description: 'Nom du cabinet ou consultant en charge de l\'accompagnement.',
          placeholder: 'Cabinet AuditPlus',
          required: true,
        },
        {
          key: 'recipients',
          label: 'Destinataires',
          type: 'text',
          description: 'Liste des personnes ou entités destinataires de ce rapport.',
          placeholder: 'Comité de pilotage, Dirigeant, Salariés',
          required: true,
        }
      ],
      initialData: projectData,
      onSave: async (data) => {
        updateProjectData(data);
      }
    });
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handlePrintConfirmed = (selections: SectionVisibility) => {
    onUpdatePrintSettings(selections);
    // Petit délai pour laisser le temps au DOM de se mettre à jour
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleFilRouge = () => {
    loadFilRougeData();
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetData();
    setShowResetConfirm(false);
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <div 
                onClick={handleEditProject}
                className="group cursor-pointer p-2 -m-2 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-sm"
                role="button"
                tabIndex={0}
                aria-label="Cliquer pour modifier les informations du projet"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleEditProject();
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Compte rendu intermédiaire de mission
                  </h1>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                      Cliquer pour modifier
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500 hidden sm:block group-hover:text-blue-500 transition-colors">
                    {projectData.projectName}
                  </p>
                  <Edit3 className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Bouton Cas fil rouge */}
            <Button
              variant="outline"
              onClick={handleFilRouge}
              className="text-sm px-2"
            >
              Cas fil rouge
            </Button>
            
            {/* Bouton Reset discret */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              reset
            </Button>
            
            {/* Icône Notice */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowNotice(true)}
                onMouseLeave={() => setShowNotice(false)}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <Lightbulb className={`h-5 w-5 transition-colors ${showNotice ? 'text-yellow-500' : 'text-gray-600'}`} />
                <span className="text-xs text-gray-500 mt-1">notice</span>
              </button>
              <NoticeTooltip isVisible={showNotice} onClose={() => setShowNotice(false)} />
            </div>
            
            {/* Icône Sauvegarde */}
            <button
              onClick={() => setShowSaveModal(true)}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Save className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-500 mt-1">save</span>
            </button>
            
            {/* Icône Impression */}
            <button
              onClick={handlePrint}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Printer className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-500 mt-1">print</span>
            </button>
          </div>
        </div>
      </div>
      </header>
      
      <EditingModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        description={modalState.description}
        fields={modalState.fields}
        initialData={modalState.initialData}
        onSave={modalState.onSave}
      />
      
      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onExport={exportData}
        onImport={importData}
      />
      
      <PrintSettingsModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        initialSelections={sectionsVisibility}
        onPrint={handlePrintConfirmed}
      />
      
      {/* Modal de confirmation reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowResetConfirm(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
            <div className="text-center">
              <RotateCcw className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmer la remise à zéro</h3>
              <p className="text-gray-600 mb-6">
                Cette action supprimera toutes les données actuelles et remettra l'application à son état initial. Cette action est irréversible.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmReset}
                  className="flex-1"
                >
                  Confirmer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;