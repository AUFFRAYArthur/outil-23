import React from 'react';
import { Edit3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EditableFieldProps {
  value: string | number;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  showEditIcon?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onClick, 
  className, 
  children, 
  showEditIcon = true 
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-md p-2 -m-2 transition-all duration-200",
        "hover:bg-blue-50 hover:ring-2 hover:ring-blue-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      tabIndex={0}
      role="button"
      aria-label="Click to edit"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children || <span>{value}</span>}
      {showEditIcon && (
        <Edit3 className="absolute -top-1 -right-1 h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
    </div>
  );
};

export default EditableField;