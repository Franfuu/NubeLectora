import type { TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  helpText?: string;
  showCharCount?: boolean;
}

const FormTextarea = ({ label, id, error, helpText, showCharCount, value, className = '', ...props }: FormTextareaProps) => {
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        {...props}
      />
      {helpText && <small className="form-help">{helpText}</small>}
      {showCharCount && <span className="char-count">{charCount} caracteres</span>}
      {error && <small className="form-error">{error}</small>}
    </div>
  );
};

export default FormTextarea;
