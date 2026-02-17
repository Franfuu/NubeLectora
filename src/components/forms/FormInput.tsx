import type { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helpText?: string;
}

const FormInput = ({ label, id, error, helpText, className = '', ...props }: FormInputProps) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
      />
      {helpText && <small className="form-help">{helpText}</small>}
      {error && <small className="form-error">{error}</small>}
    </div>
  );
};

export default FormInput;
