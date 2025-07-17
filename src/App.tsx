import React from 'react';
import DashboardPage from './pages/DashboardPage';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;
