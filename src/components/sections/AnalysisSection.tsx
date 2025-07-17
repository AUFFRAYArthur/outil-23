import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { analysis, updateAnalysis } from '../../data/mockData';
import { ThumbsUp, AlertTriangle } from 'lucide-react';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';

const AnalysisSection: React.FC = () => {
  const { modalState, openModal, closeModal } = useEditingModal();

  const handleEditStrengths = () => {
    openModal({
      title: 'Modifier les points forts',
      description: 'Mettez à jour la liste des points forts identifiés dans le projet.',
      fields: [
        {
          key: 'strengths',
          label: 'Points forts (un par ligne)',
          type: 'textarea',
          description: 'Listez les éléments positifs du projet, un point par ligne. Ces éléments renforcent la faisabilité de la transmission.',
          placeholder: 'Forte cohésion d\'équipe et motivation des salariés.\nSavoir-faire unique et reconnu sur le marché.',
          required: true,
        }
      ],
      initialData: { strengths: analysis.strengths.join('\n') },
      onSave: async (data) => {
        const strengthsArray = data.strengths.split('\n').filter((s: string) => s.trim());
        updateAnalysis({ strengths: strengthsArray });
      }
    });
  };

  const handleEditVigilancePoints = () => {
    openModal({
      title: 'Modifier les points de vigilance',
      description: 'Mettez à jour la liste des points nécessitant une attention particulière.',
      fields: [
        {
          key: 'vigilancePoints',
          label: 'Points de vigilance (un par ligne)',
          type: 'textarea',
          description: 'Listez les risques ou défis identifiés, un point par ligne. Ces éléments nécessitent un suivi attentif.',
          placeholder: 'Dépendance à un client majeur (35% du CA).\nNécessité de renforcer les compétences en gestion/finance.',
          required: true,
        }
      ],
      initialData: { vigilancePoints: analysis.vigilancePoints.join('\n') },
      onSave: async (data) => {
        const vigilanceArray = data.vigilancePoints.split('\n').filter((s: string) => s.trim());
        updateAnalysis({ vigilancePoints: vigilanceArray });
      }
    });
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
            <EditableField
              value="Points Forts"
              onClick={handleEditStrengths}
              showEditIcon={false}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditableField
            value=""
            onClick={handleEditStrengths}
            className="w-full"
          >
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            {analysis.strengths.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
            </ul>
          </EditableField>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
            <EditableField
              value="Points de Vigilance"
              onClick={handleEditVigilancePoints}
              showEditIcon={false}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditableField
            value=""
            onClick={handleEditVigilancePoints}
            className="w-full"
          >
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            {analysis.vigilancePoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
            </ul>
          </EditableField>
        </CardContent>
      </Card>
      </div>
      
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

export default AnalysisSection;
