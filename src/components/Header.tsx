import './Header.css';

export default function Header() {
    const secciones : string[] = ["Inicio", "Agregar Libro", "Ver Libros", "Contacto"];
  return (
    <header className="header">
      <h1 className="header__title">NubeLectora</h1>
      <nav className="header__nav">
        <ul>
          {secciones.map((seccion) => (
            <li key={seccion} >{seccion}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}