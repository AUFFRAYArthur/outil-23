import React, { useState } from 'react';
import { X, Download, Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
}

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, onExport, onImport }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      await onImport(file);
      setImportSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Erreur lors de l\'importation');
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = () => {
    onExport();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Sauvegarde & Restauration</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Section */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Download className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Exporter les données</h3>
            </div>
            <p className="text-sm text-gray-600">
              Téléchargez un fichier JSON contenant toutes vos données actuelles. 
              Ce fichier peut être utilisé pour restaurer votre projet ultérieurement.
            </p>
            <Button onClick={handleExport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Télécharger la sauvegarde
            </Button>
          </div>

          <div className="border-t pt-6">
            {/* Import Section */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-900">Importer une sauvegarde</h3>
              </div>
              <p className="text-sm text-gray-600">
                Sélectionnez un fichier JSON de sauvegarde pour restaurer un projet précédent. 
                Cette action remplacera toutes les données actuelles.
              </p>
              
              {importError && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm text-red-700">{importError}</span>
                </div>
              )}
              
              {importSuccess && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                  <FileText className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-700">Données importées avec succès !</span>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  disabled={isImporting}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <Button 
                  variant="outline" 
                  className="w-full" 
                  disabled={isImporting}
                >
                  {isImporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                      Importation en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Sélectionner un fichier JSON
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;