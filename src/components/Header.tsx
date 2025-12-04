import './Header.css';

export default function Header() {
    const secciones : string[] = ["Inicio", "Noticias", "Tutoriales", "Contacto"];
  return (
    <header className="header">
      <h1 className="header__title">Blog de Desarrollo Web</h1>
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