import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { keyMetrics } from '../../data/mockData';
import { Users, Target, TrendingUp, CheckCircle } from 'lucide-react';

const KeyMetricsSection: React.FC = () => {
  const { employeeEngagement, securedFinancing, totalFinancing, stepsCompleted, totalSteps } = keyMetrics;
  const financingPercentage = (securedFinancing / totalFinancing) * 100;

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

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {metric.description && <p className="text-xs text-muted-foreground">{metric.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default KeyMetricsSection;
