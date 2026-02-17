interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className={`error-message ${className}`} role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
