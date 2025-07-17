import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Info } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'currency';
  description?: string;
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => string | null;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

interface EditingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  fields: FieldConfig[];
  initialData: Record<string, any>;
  onSave: (data: Record<string, any>) => Promise<void> | void;
}

const EditingModal: React.FC<EditingModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  fields,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setErrors({});
      setSaveSuccess(false);
    }
  }, [isOpen, initialData]);

  const validateField = (field: FieldConfig, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} est requis`;
    }

    if (field.type === 'number' && value !== '' && value !== null) {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return `${field.label} doit être un nombre valide`;
      }
      if (field.min !== undefined && numValue < field.min) {
        return `${field.label} doit être supérieur ou égal à ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `${field.label} doit être inférieur ou égal à ${field.max}`;
      }
    }

    if (field.type === 'currency' && value !== '' && value !== null) {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        return `${field.label} doit être un montant valide`;
      }
    }

    if (field.validation) {
      return field.validation(value);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const error = validateField(field, formData[field.key]);
      if (error) {
        newErrors[field.key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.key] || '';
    const error = errors[field.key];

    const baseInputClasses = cn(
      "w-full px-3 py-2 border rounded-md transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
    );

    let inputElement;

    switch (field.type) {
      case 'textarea':
        inputElement = (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={cn(baseInputClasses, "min-h-[100px] resize-vertical")}
            rows={4}
          />
        );
        break;

      case 'select':
        inputElement = (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className={baseInputClasses}
          >
            <option value="">Sélectionner...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        break;

      case 'number':
        inputElement = (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className={baseInputClasses}
          />
        );
        break;

      case 'currency':
        inputElement = (
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">€</span>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              min="0"
              step="0.01"
              className={cn(baseInputClasses, "pl-8")}
            />
          </div>
        );
        break;

      default:
        inputElement = (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        );
    }

    return (
      <div key={field.key} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.description && (
          <div className="flex items-start space-x-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>{field.description}</p>
          </div>
        )}

        {inputElement}

        {error && (
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {fields.map(renderField)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Champs obligatoires
          </div>
          
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <div className="flex items-center text-green-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                Sauvegardé avec succès !
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sauvegarde...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingModal;