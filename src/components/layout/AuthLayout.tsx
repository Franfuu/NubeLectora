import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerLinks?: {
    text: string;
    link: string;
    linkText: string;
  }[];
  showHomeLink?: boolean;
  showDemoCredentials?: boolean;
}

const AuthLayout = ({ 
  title, 
  subtitle, 
  children, 
  footerLinks = [],
  showHomeLink = true,
}: AuthLayoutProps) => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>📚 {title}</h1>
          <p>{subtitle}</p>
        </div>

        {children}

        <div className="auth-footer">
          {footerLinks.map((link, index) => (
            <p key={index}>
              {link.text} <Link to={link.link}>{link.linkText}</Link>
            </p>
          ))}
          {showHomeLink && (
            <p>
              <Link to="/">← Volver al inicio</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
