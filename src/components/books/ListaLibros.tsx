import TarjetaLibro from './TarjetaLibro';
import type { Libro } from '../../types/libro';

interface ListaLibrosProps {
  libros: Libro[];
  onSelectLibro: (id: number) => void;
}

const ListaLibros = ({ libros, onSelectLibro }: ListaLibrosProps) => {
  if (libros.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No se encontraron libros</p>
      </div>
    );
  }

  return (
    <div className="lista-libros">
      {libros.map((libro) => (
        <TarjetaLibro
          key={libro.id}
          libro={libro}
          onSelect={onSelectLibro}
          mostrarDetalles={true}
        />
      ))}
    </div>
  );
};

export default ListaLibros;