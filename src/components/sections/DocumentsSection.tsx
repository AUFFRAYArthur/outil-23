import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { documents, updateDocuments } from '../../data/mockData';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import EditableField from '../ui/EditableField';
import EditingModal from '../ui/EditingModal';
import { useEditingModal } from '../../hooks/useEditingModal';

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
  const { modalState, openModal, closeModal } = useEditingModal();

  const handleEditDocuments = () => {
    openModal({
      title: 'Modifier les livrables et données',
      description: 'Mettez à jour le statut des différents livrables du projet de transmission.',
      fields: documents.map(doc => ({
        key: `status_${doc.id}`,
        label: doc.title,
        type: 'select' as const,
        description: `Statut actuel de "${doc.title}"`,
        required: true,
        options: [
          { value: 'pending', label: 'En attente' },
          { value: 'in_progress', label: 'En cours' },
          { value: 'completed', label: 'Complété' },
        ]
      })),
      initialData: documents.reduce((acc, doc) => ({
        ...acc,
        [`status_${doc.id}`]: doc.status
      }), {}),
      onSave: async (data) => {
        const updatedDocuments = documents.map(doc => ({
          ...doc,
          status: data[`status_${doc.id}`]
        }));
        console.log('DocumentsSection: About to update documents with new statuses');
        updateDocuments(updatedDocuments);
      }
    });
  };

  return (
    <>
      <Card>
      <CardHeader>
        <CardTitle>
          <EditableField
            value="Livrables et Données"
            onClick={handleEditDocuments}
            showEditIcon={false}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditableField
          value=""
          onClick={handleEditDocuments}
          className="w-full"
        >
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
        </EditableField>
      </CardContent>
      </Card>
      
      <EditingModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        description={modalState.description}
        fields={modalState.fields}
        initialData={modalState.initialData}
        onSave={modalState.onSave}
      />
    </>
  );
};

export default DocumentsSection;
