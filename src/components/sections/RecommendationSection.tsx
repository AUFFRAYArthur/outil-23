import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { Check, X, AlertTriangle, Printer } from 'lucide-react';

type Recommendation = 'go' | 'no_go' | 'conditional_go';

const RecommendationSection: React.FC = () => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  
  const handlePrint = () => {
    window.print();
  };

  const options: { id: Recommendation; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'go', label: 'Go', icon: Check, color: 'border-green-500 hover:bg-green-50 text-green-600' },
    { id: 'no_go', label: 'No Go', icon: X, color: 'border-red-500 hover:bg-red-50 text-red-600' },
    { id: 'conditional_go', label: 'Go Conditionnel', icon: AlertTriangle, color: 'border-yellow-500 hover:bg-yellow-50 text-yellow-600' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conclusion et Recommandation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-medium mb-2">Décision du comité de pilotage :</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setRecommendation(option.id)}
                className={cn(
                  'flex items-center justify-center p-4 border-2 rounded-lg transition-all duration-200',
                  option.color,
                  recommendation === option.id ? 'bg-opacity-20 bg-current' : 'bg-transparent'
                )}
              >
                <option.icon className="h-5 w-5 mr-2" />
                <span className="font-semibold">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        {recommendation === 'conditional_go' && (
          <div className="animate-accordion-down">
            <label htmlFor="conditions" className="block text-sm font-medium mb-1">
              Préciser les conditions / réserves :
            </label>
            <textarea
              id="conditions"
              rows={4}
              className="w-full p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
              placeholder="Ex: Validation du financement complémentaire de 50k€ sous 4 semaines..."
            />
          </div>
        )}
        <div className="flex justify-end">
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimer le compte rendu intermédiaire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationSection;
