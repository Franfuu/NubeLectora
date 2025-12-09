/**
 * ============================================================================
 * ✅ REQUISITO A: Componente sin props (1 de 2 requeridos)
 * ============================================================================
 * 
 * Header cumple con:
 * - No recibe ninguna prop
 * - Es un componente completamente estático
 * - Muestra el encabezado fijo de la aplicación con título y eslogan
 * - No tiene estado interno ni lógica de negocio
 */
const Header = () => {
  return (
    <header className="header">
      <h1><img src="/logo.png" alt="Logo NubeLectora" className="header-logo" />NubeLectora</h1>
      <p>Tu biblioteca personal en la nube</p>
    </header>
  );
};

export default Header;