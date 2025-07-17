import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { nextSteps } from '../../data/mockData';
import { Calendar, Clock } from 'lucide-react';

const NextStepsSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Prochaines Étapes et Calendrier
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default NextStepsSection;
