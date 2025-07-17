import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { documents } from '../../data/mockData';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-green-500 bg-green-100',
    label: 'Complété',
  },
  in_progress: {
    icon: Clock,
    color: 'text-yellow-500 bg-yellow-100',
    label: 'En cours',
  },
  pending: {
    icon: AlertCircle,
    color: 'text-red-500 bg-red-100',
    label: 'En attente',
  },
};

const DocumentsSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Livrables et Données</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => {
            const config = statusConfig[doc.status as keyof typeof statusConfig];
            return (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={cn('p-2 rounded-full', config.color)}>
                    <doc.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{doc.title}</span>
                </div>
                <div className={cn('text-xs font-semibold px-2 py-1 rounded-full', config.color)}>
                  {config.label}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
