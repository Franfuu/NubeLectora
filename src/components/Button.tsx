// 3. Componente reutilizable (Botón personalizable)
interface ButtonProps {
  texto: string;
  color?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  icono?: string;
}

const Button = ({ texto, color = 'primary', onClick, icono }: ButtonProps) => {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {icono && <span>{icono}</span>}
      {texto}
    </button>
  );
};

export default Button;