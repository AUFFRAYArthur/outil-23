import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { keyMetrics } from '../../data/mockData';
import { useRealtimeSync } from '../../hooks/useRealtimeSync';

const FinancingChart: React.FC = () => {
  const [updateCounter, forceUpdate] = React.useReducer(x => x + 1, 0);
  
  // Subscribe to financing changes with stable callback
  const handleFinancingSync = React.useCallback(() => {
    forceUpdate();
  }, []);
  
  useRealtimeSync('financing-sync', handleFinancingSync);
  
  // Get current values on each render to ensure fresh data
  const { securedFinancing, totalFinancing } = keyMetrics;
  const remainingFinancing = totalFinancing - securedFinancing;

  const data = [
    {
      name: 'Financement',
      sécurisé: securedFinancing,
      restant: remainingFinancing,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickFormatter={formatCurrency} />
        <YAxis type="category" dataKey="name" hide />
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="sécurisé" stackId="a" fill="#16a34a" name="Sécurisé" />
        <Bar dataKey="restant" stackId="a" fill="#ef4444" name="Restant" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancingChart;
