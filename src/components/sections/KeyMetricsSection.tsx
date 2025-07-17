import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { keyMetrics, updateKeyMetrics } from '../../data/mockData';
import { Users, Target, TrendingUp, CheckCircle } from 'lucide-react';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';
import { useRealtimeSync } from '../../hooks/useRealtimeSync';
import { cn } from '../../lib/utils';

const KeyMetricsSection: React.FC = () => {
  const [updateCounter, forceUpdate] = React.useReducer(x => x + 1, 0);
  
  // Subscribe to steps completion changes with stable callback
  const handleStepsSync = React.useCallback(() => {
    console.log('KeyMetricsSection: Received steps-completion-sync notification. Current steps:', keyMetrics.stepsCompleted, '/', keyMetrics.totalSteps);
    forceUpdate();
  }, []);
  
  useRealtimeSync('steps-completion-sync', handleStepsSync);
  
  // Get current values on each render to ensure fresh data
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
    // Fonction désactivée - calcul automatique uniquement
  };

  return (
    <>
      <section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => {
          const handleEdit = index === 0 ? handleEditEngagement : 
                           index === 1 ? handleEditFinancing : 
                           undefined; // Désactiver l'édition pour les étapes
          
          return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              {index === 2 ? (
                // Affichage en lecture seule pour les étapes réalisées
                <div className="text-2xl font-bold">{metric.value}</div>
              ) : (
                <EditableField
                  value={metric.value}
                  onClick={handleEdit}
                  className={cn(
                    "text-2xl font-bold",
                    index === 0 && employeeEngagement < 50 ? "text-red-600" : ""
                  )}
                />
              )}
              {index === 0 && employeeEngagement < 50 && (
                <p className="text-xs text-red-600 font-medium mt-1">
                  ⚠️ Taux critique - Risque élevé pour le projet
                </p>
              )}
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
