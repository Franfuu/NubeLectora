import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  texto?: string;
  children?: ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  onClick?: () => void;
  icono?: ReactNode;
  variant?: 'solid' | 'outline' | 'text';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({ 
  texto, 
  children,
  color = 'primary', 
  onClick, 
  icono,
  variant = 'solid',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => {
  const classes = [
    'btn',
    `btn-${color}`,
    variant !== 'solid' && `btn-${variant}`,
    fullWidth && 'btn-full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn-spinner"></span>}
      {!isLoading && icono && <span className="btn-icon">{icono}</span>}
      {children || texto}
    </button>
  );
};

export default Button;