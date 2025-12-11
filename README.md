# NubeLectora — Práctica 3.1 React (Componentes y Estado)

![React](https://img.shields.io/badge/React-19-blue? logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Build-Vite-purple) ![Estado](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)

**Desarrollado por:** Francisco Pérez
**Asignatura:** Desarrollo Web en Entorno Cliente
**Fecha:** Diciembre 2025
**Repositorio:** [NubeLectora](https://github.com/Franfuu/NubeLectora)

---

## Descripción General

Aplicación React que simula una **plataforma de lectura en la nube**, permitiendo:

- Buscar y seleccionar libros
- Ver detalles completos (nombre, autores, reseña...)
- Añadir libros con sistema de interacción
- Interfaz responsive con componentes reutilizables
- Experiencia de usuario fluida y moderna

**Temática:** Biblioteca digital en la nube.

---

## ESTRUCTURA DEL PROYECTO

```
NubeLectora/
│
├── README.md                         ← Documentación completa
├── package.json                      ← Dependencias del proyecto
├── vite.config.ts                    ← Configuración de Vite
├── tsconfig. json                     ← Configuración TypeScript
│
├── public/                           ← Recursos estáticos
│
├── src/
│   ├── App.tsx                       [A1] Estado Global
│   ├── main.tsx                      ← Punto de entrada
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header. tsx
│   │   │   ├── Footer.tsx            [A2] Sin props
│   │   │   └── SearchBar.tsx         [A6] Callback
│   │   │
│   │   ├── Books/
│   │   │   ├── BookList.tsx          [A7] Lista . map()
│   │   │   ├── BookViewer. tsx        [A8] Panel Visor
│   │   │   ├── BookCard.tsx          [A3a] Reutilizable
│   │   │   └── BookMetadata. tsx
│   │   │
│   │   ├── Comments/
│   │   │   ├── CommentForm.tsx       [A5] Formulario
│   │   │   ├── CommentList.tsx       [B1] Estado Local
│   │   │   └── CommentButton.tsx
│   │   │
│   │   └── Common/
│   │       ├── Badge.tsx             [A3b] Reutilizable
│   │       └── Button.tsx            [A4a] Props apariencia
│   │
│   ├── data/
│   │   └── books.ts                  ← Mock Data
│   │
│   ├── types/
│   │   ├── book.ts
│   │   ├── comment.ts
│   │   └── author.ts
│   │
│   └── styles/
│       └── *.css
│
└── eslint. config.js
```

---

## Instalación y Ejecución

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Franfuu/NubeLectora.git
   cd NubeLectora
   ```
2. **Instalar dependencias:**

   ```bash
   npm install
   ```
3. **Arrancar servidor de desarrollo:**

   ```bash
   npm run dev
   ```
4. **Build para producción:**

   ```bash
   npm run build
   ```
5. **Preview del build:**

   ```bash
   npm run preview
   ```

---

## TECNOLOGÍAS UTILIZADAS

- **React 19** con Hooks (useState, useEffect)
- **TypeScript 5.9** para tipado estático
- **CSS3** con variables CSS dinámicas
- **Vite 7** como bundler ultrarrápido
- **ESLint 9** para linting y calidad de código
- **SWC** para compilación rápida de React

---

## VERIFICACIÓN COMPLETA DE REQUISITOS — Práctica 3.1

### ANÁLISIS DETALLADO POR REQUISITO

---

### **A. COMPONENTES (Mínimo 8)**

#### **A1. Componente Raíz (Estado Global)**

**Requisito:** Un componente raíz App que controle el estado global que deba compartirse y coordine al resto.

| **Aspecto**       | **Detalle**                                                |
| ----------------------- | ---------------------------------------------------------------- |
| **Componente**    | `App`                                                          |
| **Archivo**       | `src/App.tsx`                                                  |
| **Estado Global** | `const [selectedBook, setSelectedBook] = useState<number>(0);` |
| **Distribución** | Pasa estado y setters a componentes hijos                        |
| **Verificación** | Controla el libro seleccionado y coordina componentes            |

---

#### **A2. Componente sin Props**

**Requisito:** Al menos un componente sin props (footer, header estático, etc.)

| **Aspecto**       | **Detalle**                          |
| ----------------------- | ------------------------------------------ |
| **Componente**    | `Footer`                                 |
| **Archivo**       | `src/components/Layout/Footer.tsx`       |
| **Props**         | Ninguno                                    |
| **Contenido**     | Copyright estático y enlaces              |
| **Verificación** | Renderizado puro sin dependencias externas |

---

#### **A3. Componentes Reutilizables (Mínimo 3)**

##### **A3a. BookCard**

- **Archivo:** `src/components/Books/BookCard.tsx`
- **Uso:** Renderizado en lista y en visor detallado
- **Verificación:** Reutilizado en múltiples contextos

##### **A3b.  Badge**

- **Archivo:** `src/components/Common/Badge. tsx`
- **Uso:** Etiquetas de género, estado, categorías
- **Verificación:** Usado múltiples veces en diferentes componentes

##### **A3c. Button**

- **Archivo:** `src/components/Common/Button. tsx`
- **Uso:** Botones de acción en toda la aplicación
- **Verificación:** Componente reutilizable universal

---

#### **A4. Props para Personalizar Apariencia (Mínimo 2)**

##### **A4a. Button**

```typescript
interface ButtonProps {
  variant?:  "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React. ReactNode;
}
```

**Verificación:** Personaliza color y tamaño

##### **A4b. BookCard**

```typescript
interface BookCardProps {
  book: Book;
  layout?: "vertical" | "horizontal";
  showDetails?: boolean;
}
```

**Verificación:** Personaliza disposición y visibilidad de elementos

---

#### **A5. Formulario Controlado**

**Componente:** `CommentForm`
**Archivo:** `src/components/Comments/CommentForm. tsx`

```typescript
const [username, setUsername] = useState("");
const [comment, setComment] = useState("");

function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (username.trim() && comment.trim()) {
    onSubmit(username, comment);
    setUsername("");
    setComment("");
  }
}
```

**Verificación:** Inputs controlados con validación

---

#### **A6. Callback al Padre**

**Componente:** `SearchBar`
**Archivo:** `src/components/Layout/SearchBar.tsx`

```typescript
interface SearchBarProps {
  onBookSelect: (bookId:  number) => void;
  books: Book[];
}

function SearchBar({ onBookSelect, books }: SearchBarProps) {
  const handleSelect = (id: number) => {
    onBookSelect(id); // Modifica estado del padre
  };
  // ...  
}
```

**Verificación:** Modifica estado padre mediante callback

---

#### **A7. Renderizado de Listas (. map)**

**Componente:** `BookList`
**Archivo:** `src/components/Books/BookList.tsx`

```typescript
function BookList({ books }: BookListProps) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          layout="vertical"
        />
      ))}
    </div>
  );
}
```

**Verificación:** . map() con keys correctas

---

#### **A8. Panel Visor/Detalle**

**Componente:** `BookViewer`
**Archivo:** `src/components/Books/BookViewer.tsx`

```typescript
function BookViewer({ book }: BookViewerProps) {
  return (
    <article className="book-viewer">
      <BookMetadata book={book} />
      <Synopsis text={book. synopsis} />
      <AuthorInfo author={book.author} />
      <CommentList comments={book.comments} />
    </article>
  );
}
```

**Verificación:** Panel completo de detalles del libro seleccionado

---

### **B. GESTIÓN DE ESTADOS (useState)**

#### **B1. Estados Locales (Mínimo 2)**

1. **SearchBar:** `searchTerm:  string`
2. **CommentForm:** `username: string`, `comment: string`
3. **CommentButton:** `isLiked: boolean`, `count: number`
4. **CommentList:** `comments: Comment[]`

**Verificación:** 4+ estados locales independientes

---

#### **B2. Estado Compartido (Lifting State Up)**

```typescript
// App.tsx
const [selectedBook, setSelectedBook] = useState<number>(0);

return (
  <>
    <Header onBookSelect={setSelectedBook} /> {/* Escritura */}
    <BookViewer book={books[selectedBook]} /> {/* Lectura */}
    <Sidebar book={books[selectedBook]} />    {/* Lectura */}
  </>
);
```

**Verificación:** Estado compartido entre múltiples componentes

---

## RESUMEN DE CUMPLIMIENTO

```
┌────────────────────────────────────────────────────────────┐
│ PRÁCTICA 3.1 — CUMPLIMIENTO COMPLETO                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ A. COMPONENTES (Mínimo 8)                                  │
│    A1. App raíz                                            │
│    A2. Componente sin props (Footer)                       │
│    A3. Componentes reutilizables (×3)                      │
│    A4. Props de personalización (×2)                       │
│    A5. Formulario controlado                               │
│    A6. Callback al padre                                   │
│    A7. Lista con .map()                                    │
│    A8. Panel visor                                         │
│                                                            │
│ B. ESTADOS (useState)                                      │
│    B1. Estados locales (×4+)                               │
│    B2. Estado compartido + callbacks                       │
│                                                            │
│ C. EXTRAS                                                  │
│    - TypeScript para type safety                           │
│    - ESLint configurado                                    │
│    - Estructura escalable                                  │
│    - Diseño responsive                                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Autor

**Franfuu**
GitHub: [@Franfuu](https://github.com/Franfuu)

---

## Licencia

Este proyecto es parte de una práctica académica para la asignatura de Desarrollo Web en Entorno Cliente.

---

## Agradecimientos

- Profesorado de Desarrollo Web en Entorno Cliente
- Comunidad de React y TypeScript
- Documentación oficial de Vite

---

**Gracias por revisar NubeLectora!**
