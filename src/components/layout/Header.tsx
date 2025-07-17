import React from 'react';
import { Briefcase, FileDown, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { projectData } from '../../data/mockData';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Compte rendu intermédiaire de mission</h1>
              <p className="text-sm text-gray-500 hidden sm:block">{projectData.projectName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
