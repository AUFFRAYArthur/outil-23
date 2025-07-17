import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import FinancingChart from '../charts/FinancingChart';
import EngagementChart from '../charts/EngagementChart';

const ChartsSection: React.FC = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Progression du Financement</CardTitle>
        </CardHeader>
        <CardContent>
          <FinancingChart />
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Engagement des Salariés</CardTitle>
        </CardHeader>
        <CardContent>
          <EngagementChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
