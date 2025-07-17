import { useCallback } from 'react';
import { 
  keyMetrics, 
  projectData, 
  documents, 
  analysis, 
  nextSteps,
  updateKeyMetrics,
  updateProjectData,
  updateDocuments,
  updateAnalysis,
  updateNextSteps
} from '../data/mockData';

export const useSaveLoad = () => {
  const exportData = useCallback(() => {
    const dataToExport = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: {
        keyMetrics: {
          employeeEngagement: keyMetrics.employeeEngagement,
          securedFinancing: keyMetrics.securedFinancing,
          totalFinancing: keyMetrics.totalFinancing,
        },
        projectData: { ...projectData },
        documents: [...documents],
        analysis: { ...analysis },
        nextSteps: [...nextSteps],
      }
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `outil23-sauvegarde-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const importData = useCallback(async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content);
          
          // Validation basique
          if (!importedData.data) {
            throw new Error('Format de fichier invalide');
          }

          const { data } = importedData;
          
          // Restaurer les données
          if (data.keyMetrics) {
            updateKeyMetrics(data.keyMetrics);
          }
          
          if (data.projectData) {
            updateProjectData(data.projectData);
          }
          
          if (data.documents) {
            updateDocuments(data.documents);
          }
          
          if (data.analysis) {
            updateAnalysis(data.analysis);
          }
          
          if (data.nextSteps) {
            updateNextSteps(data.nextSteps);
          }

          resolve();
        } catch (error) {
          reject(new Error('Erreur lors de la lecture du fichier. Vérifiez que le format est correct.'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };
      
      reader.readAsText(file);
    });
  }, []);

  return { exportData, importData };
};