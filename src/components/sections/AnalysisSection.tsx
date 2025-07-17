import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { analysis } from '../../data/mockData';
import { ThumbsUp, AlertTriangle } from 'lucide-react';

const AnalysisSection: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
            Points Forts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            {analysis.strengths.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
            Points de Vigilance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            {analysis.vigilancePoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisSection;
