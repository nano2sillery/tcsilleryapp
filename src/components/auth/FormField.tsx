import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  label,
  error,
  icon,
  className,
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="flex items-center text-sm font-medium text-gray-700">
          {icon && <span className="text-gray-400 mr-2">{icon}</span>}
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "block w-full h-12 px-3",
          "rounded-lg border border-gray-300 shadow-sm",
          "focus:ring-2 focus:ring-tertiary-500 focus:border-transparent",
          error && "border-red-300 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;