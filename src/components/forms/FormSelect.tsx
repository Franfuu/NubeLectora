import type { SelectHTMLAttributes, ReactNode } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
  helpText?: string;
  children: ReactNode;
}

const FormSelect = ({ label, id, error, helpText, children, className = '', ...props }: FormSelectProps) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...props}
      >
        {children}
      </select>
      {helpText && <small className="form-help">{helpText}</small>}
      {error && <small className="form-error">{error}</small>}
    </div>
  );
};

export default FormSelect;
