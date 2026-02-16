interface Button {
  texto: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  onClick: () => void;
}

const Button = ({ texto, color = 'primary', onClick }: Button) => {
  return (
    <button 
      className={`btn btn-${color}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Button;