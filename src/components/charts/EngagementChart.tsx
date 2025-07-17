import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { keyMetrics } from '../../data/mockData';
import { useRealtimeSync } from '../../hooks/useRealtimeSync';

const EngagementChart: React.FC = () => {
  const [updateCounter, forceUpdate] = React.useReducer(x => x + 1, 0);
  
  // Subscribe to employee engagement changes with stable callback
  const handleEngagementSync = React.useCallback(() => {
    forceUpdate();
  }, []);
  
  useRealtimeSync('employee-engagement-sync', handleEngagementSync);
  
  // Get current values on each render to ensure fresh data
  const { employeeEngagement } = keyMetrics;
  const data = [
    { name: 'Favorables', value: employeeEngagement },
    { name: 'Autres', value: 100 - employeeEngagement },
  ];
  const COLORS = ['#16a34a', '#e5e7eb'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value}%`} />
        <Legend />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-800">
          {`${employeeEngagement}%`}
        </text>
        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-500">
          Favorables
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EngagementChart;
