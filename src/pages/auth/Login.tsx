import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { authService } from '../../services/authService';
import AuthLayout from '../../components/layout/AuthLayout';
import FormInput from '../../components/forms/FormInput';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Button from '../../components/ui/Button';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      login({
        user: response.user,
        token: response.token,
      });
      navigate('/libros');
    } catch (err) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="NubeLectora"
      subtitle="Inicia sesión para acceder a tu biblioteca"
      footerLinks={[
        {
          text: '¿No tienes cuenta?',
          link: '/register',
          linkText: 'Regístrate aquí'
        }
      ]}
      showHomeLink={true}
      showDemoCredentials={true}
    >
      <form onSubmit={handleSubmit} className="login-form">
        <ErrorMessage message={error} />

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
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="btn-login"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </AuthLayout>
  );
}
