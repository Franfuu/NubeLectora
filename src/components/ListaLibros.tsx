// src/components/ListaLibros.tsx
import LibroCard from './LibroCard';
import type { Libro } from '../types/libro';

interface ListaLibrosProps {
  libros: Libro[];
  onSelectLibro: (id: number) => void;
  onDeleteLibro: (id: number) => void;
}

const ListaLibros = ({ libros, onSelectLibro, onDeleteLibro }: ListaLibrosProps) => {
  return (
    <div className="lista-libros">
      {libros.map(libro => (
        <LibroCard
          key={libro.id}
          libro={libro}
          onSelect={onSelectLibro}
          onDelete={onDeleteLibro}
        />
      ))}
    </div>
  );
};

export default ListaLibros;