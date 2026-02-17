interface SuccessMessageProps {
  title: string;
  message?: string;
  secondaryMessage?: string;
  icon?: string;
}

const SuccessMessage = ({ 
  title, 
  message, 
  secondaryMessage, 
  icon = '✅' 
}: SuccessMessageProps) => {
  return (
    <div className="success-message">
      <div className="success-icon">{icon}</div>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {secondaryMessage && <p>{secondaryMessage}</p>}
    </div>
  );
};

export default SuccessMessage;
