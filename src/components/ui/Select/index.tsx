import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { SelectProps } from './types';

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  icon,
  className,
  children,
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
      <select
        ref={ref}
        className={cn(
          "block w-full h-12 px-3 rounded-lg border-gray-300 shadow-sm",
          "focus:ring-2 focus:ring-tertiary-500 focus:border-transparent",
          "text-base appearance-none bg-white",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 20 20\"%3E%3Cpath stroke=\"%236b7280\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"m6 8 4 4 4-4\"/%3E%3C/svg%3E')]",
          "bg-[length:1.25rem_1.25rem] bg-no-repeat bg-[right_0.5rem_center]",
          "pr-10",
          error && "border-red-300 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;