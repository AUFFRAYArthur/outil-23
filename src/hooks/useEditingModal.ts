import { useState } from 'react';

interface EditingModalState {
  isOpen: boolean;
  title: string;
  description?: string;
  fields: any[];
  initialData: Record<string, any>;
  onSave: (data: Record<string, any>) => Promise<void> | void;
}

export const useEditingModal = () => {
  const [modalState, setModalState] = useState<EditingModalState>({
    isOpen: false,
    title: '',
    description: '',
    fields: [],
    initialData: {},
    onSave: () => {},
  });

  const openModal = (config: Omit<EditingModalState, 'isOpen'>) => {
    setModalState({
      ...config,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};