import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { nextSteps, updateNextSteps } from '../../data/mockData';
import { Calendar, Clock } from 'lucide-react';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';

const NextStepsSection: React.FC = () => {
  const { modalState, openModal, closeModal } = useEditingModal();

  const handleEditNextSteps = () => {
    openModal({
      title: 'Modifier les prochaines étapes',
      description: 'Mettez à jour le calendrier et les tâches à venir dans le processus de transmission.',
      fields: [
        {
          key: 'steps',
          label: 'Étapes (format: Tâche | Échéance)',
          type: 'textarea',
          description: 'Listez les prochaines étapes, une par ligne, au format "Tâche | Échéance". Exemple: "Finaliser le tour de table financier | 3 semaines"',
          placeholder: 'Finaliser le tour de table financier | 3 semaines\nRédiger les statuts définitifs de la SCOP | 5 semaines',
          required: true,
        }
      ],
      initialData: { 
        steps: nextSteps.map(step => `${step.task} | ${step.deadline}`).join('\n')
      },
      onSave: async (data) => {
        const stepsArray = data.steps.split('\n')
          .filter((s: string) => s.trim())
          .map((step: string, index: number) => {
            const [task, deadline] = step.split(' | ');
            return {
              id: index + 1,
              task: task?.trim() || '',
              deadline: deadline?.trim() || '',
              completed: false
            };
          });
        updateNextSteps(stepsArray);
      }
    });
  };

  return (
    <>
      <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <EditableField
            value="Prochaines Étapes et Calendrier"
            onClick={handleEditNextSteps}
            showEditIcon={false}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditableField
          value=""
          onClick={handleEditNextSteps}
          className="w-full"
        >
          <div className="space-y-4">
          {nextSteps.map((step) => (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {step.id}
              </div>
              <div>
                <p className="font-semibold">{step.task}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>Échéance : {step.deadline}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </EditableField>
      </CardContent>
      </Card>
      
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

export default NextStepsSection;
