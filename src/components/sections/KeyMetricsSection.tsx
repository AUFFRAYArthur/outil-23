import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { keyMetrics, updateKeyMetrics } from '../../data/mockData';
import { Users, Target, TrendingUp, CheckCircle } from 'lucide-react';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';
import { useRealtimeSync } from '../../hooks/useRealtimeSync';

const KeyMetricsSection: React.FC = () => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  
  // Subscribe to steps completion changes
  useRealtimeSync('steps-completion-sync', forceUpdate);
  
  const { employeeEngagement, securedFinancing, totalFinancing, stepsCompleted, totalSteps } = keyMetrics;
  const financingPercentage = (securedFinancing / totalFinancing) * 100;
  const { modalState, openModal, closeModal } = useEditingModal();

  const metrics = [
    {
      title: 'Salariés favorables',
      value: `${employeeEngagement}%`,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Financement sécurisé',
      value: `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(securedFinancing)}`,
      icon: TrendingUp,
      color: 'text-green-500',
      description: `sur ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalFinancing)}`,
    },
    {
      title: 'Étapes réalisées',
      value: `${stepsCompleted} / ${totalSteps}`,
      icon: CheckCircle,
      color: 'text-indigo-500',
    },
  ];

  const handleEditEngagement = () => {
    openModal({
      title: 'Modifier l\'engagement des salariés',
      description: 'Ajustez le pourcentage de salariés favorables au projet de transmission.',
      fields: [
        {
          key: 'employeeEngagement',
          label: 'Pourcentage de salariés favorables',
          type: 'number',
          description: 'Pourcentage basé sur les entretiens individuels et enquêtes menées auprès des salariés. Doit être compris entre 0 et 100.',
          placeholder: '78',
          required: true,
          min: 0,
          max: 100,
          validation: (value: number) => {
            if (value < 50) {
              return 'Un taux inférieur à 50% peut compromettre le projet';
            }
            return null;
          }
        }
      ],
      initialData: { employeeEngagement },
      onSave: async (data) => {
        updateKeyMetrics({ employeeEngagement: data.employeeEngagement });
      }
    });
  };

  const handleEditFinancing = () => {
    openModal({
      title: 'Modifier le financement',
      description: 'Mettez à jour les montants de financement sécurisé et total nécessaire.',
      fields: [
        {
          key: 'securedFinancing',
          label: 'Financement sécurisé',
          type: 'currency',
          description: 'Montant déjà confirmé par les banques, investisseurs ou autres sources de financement.',
          placeholder: '350000',
          required: true,
        },
        {
          key: 'totalFinancing',
          label: 'Financement total nécessaire',
          type: 'currency',
          description: 'Montant total requis pour finaliser la transmission de l\'entreprise.',
          placeholder: '500000',
          required: true,
        }
      ],
      initialData: { securedFinancing, totalFinancing },
      onSave: async (data) => {
        if (data.securedFinancing > data.totalFinancing) {
          throw new Error('Le financement sécurisé ne peut pas dépasser le financement total');
        }
        updateKeyMetrics({ 
          securedFinancing: data.securedFinancing,
          totalFinancing: data.totalFinancing 
        });
      }
    });
  };

  const handleEditSteps = () => {
    openModal({
      title: 'Information sur l\'avancement des étapes',
      description: 'Le nombre d\'étapes réalisées se calcule automatiquement en fonction du statut des livrables. Modifiez les statuts dans la section "Livrables et Données" pour mettre à jour ce compteur.',
      fields: [
        {
          key: 'info',
          label: 'Calcul automatique',
          type: 'text',
          description: 'Les étapes réalisées correspondent aux livrables ayant le statut "Complété". Pour modifier ce nombre, changez le statut des livrables dans la section correspondante.',
          placeholder: 'Calcul automatique basé sur les livrables',
          required: false,
        }
      ],
      initialData: { info: 'Calcul automatique basé sur les livrables' },
      onSave: async (data) => {
        // No action needed as this is informational only
      }
    });
  };

  return (
    <>
      <section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => {
          const handleEdit = index === 0 ? handleEditEngagement : 
                           index === 1 ? handleEditFinancing : 
                           handleEditSteps;
          
          return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <EditableField
                value={metric.value}
                onClick={handleEdit}
                className="text-2xl font-bold"
              />
              {metric.description && <p className="text-xs text-muted-foreground">{metric.description}</p>}
            </CardContent>
          </Card>
          );
        })}
      </div>
      </section>
      
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

export default KeyMetricsSection;
