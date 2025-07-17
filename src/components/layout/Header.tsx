import React from 'react';
import { Briefcase, FileDown, Settings, Edit3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { projectData, updateProjectData } from '../../data/mockData';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';

const Header: React.FC = () => {
  const { modalState, openModal, closeModal } = useEditingModal();

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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
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
    </>
  );
};

export default Header;