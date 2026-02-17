import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import AuthLayout from '../../components/layout/AuthLayout';
import FormInput from '../../components/forms/FormInput';
import ErrorMessage from '../../components/ui/ErrorMessage';
import SuccessMessage from '../../components/ui/SuccessMessage';
import Button from '../../components/ui/Button';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!email.trim()) {
      setError('El email es obligatorio');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        email: email.trim(),
        password: password,
        name: name.trim()
      });

      setSuccess(true);

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || 'Error al registrar usuario. El email puede estar ya registrado.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="NubeLectora"
        subtitle="Crea tu cuenta para comenzar"
        footerLinks={[]}
        showHomeLink={false}
      >
        <SuccessMessage
          title="¡Registro exitoso!"
          message="Tu cuenta ha sido creada correctamente."
          secondaryMessage="Redirigiendo al inicio de sesión..."
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="NubeLectora"
      subtitle="Crea tu cuenta para comenzar"
      footerLinks={[
        {
          text: '¿Ya tienes cuenta?',
          link: '/login',
          linkText: 'Inicia sesión aquí'
        }
      ]}
      showHomeLink={true}
    >
      <form onSubmit={handleSubmit} className="register-form">
        <ErrorMessage message={error} />

        <FormInput
          label="Nombre completo"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          required
          disabled={loading}
        />

        <FormInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={loading}
        />

        <FormInput
          label="Contraseña"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={loading}
          minLength={6}
          helpText="Mínimo 6 caracteres"
        />

        <FormInput
          label="Confirmar contraseña"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={loading}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="btn-register"
        >
          {loading ? 'Registrando...' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  );
}
