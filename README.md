# NubeLectora 📚

Aplicación React que gestiona una **biblioteca personal en la nube**. Permite ver un catálogo de libros, filtrarlos por estado de lectura, buscar por título o autor, añadir nuevos libros, eliminarlos y consultar el detalle de cada uno.

El proyecto está diseñado específicamente para la práctica:

> **Práctica 3.1. Diseño de una Aplicación React Basada en Componentes (Tema Libre)**
> Centrada en **componentización, props, eventos y `useState`**.

---

## 1. Tecnologías usadas

- React 19 + TypeScript
- Vite 7 (dev server y build)
- CSS plano (sin frameworks) en [src/App.css](src/App.css) y [src/index.css](src/index.css)
- ESLint + TypeScript ESLint para calidad de código

---

## 2. Ejecución del proyecto

### Requisitos previos

- Node.js recomendado: >= 20
- npm

### Instalación de dependencias

```bash
npm install
```

### Entorno de desarrollo

```bash
npm run dev
```

Abre la URL que muestre Vite (normalmente `http://localhost:5173`).

### Build de producción

```bash
npm run build
```

### Vista previa del build

```bash
npm run preview
```

---

## 3. Estructura principal

- Componente raíz: [`App`](src/App.tsx)
- Entrada de la app: [`main.tsx`](src/main.tsx)
- HTML base: [`index.html`](index.html)
- Estilos globales: [`index.css`](src/index.css)
- Estilos de la app: [`App.css`](src/App.css)
- Tipos y datos:
  - Tipo libro: [`Libro`](src/types/libro.ts)
  - Datos iniciales: [`librosIniciales`](src/data/libros.ts)

Componentes en `src/components/`:

- [`Header`](src/components/Header.tsx)
- [`Footer`](src/components/Footer.tsx)
- [`FormularioLibro`](src/components/FormularioLibro.tsx)
- [`ListaLibros`](src/components/ListaLibros.tsx)
- [`TarjetaLibro`](src/components/TarjetaLibro.tsx)
- [`DetalleLibro`](src/components/DetalleLibro.tsx)
- [`Filtros`](src/components/Filtros.tsx)
- [`Estadisticas`](src/components/Estadisticas.tsx)
- [`EtiquetaEstado`](src/components/EtiquetaEstado.tsx)
- [`Button`](src/components/Button.tsx)

---

## 4. Funcionalidades de la aplicación

1. **Listado de libros**

   - Se muestran en un **grid de tarjetas** usando [`ListaLibros`](src/components/ListaLibros.tsx) y [`TarjetaLibro`](src/components/TarjetaLibro.tsx).
   - Datos iniciales definidos en [`librosIniciales`](src/data/libros.ts).
2. **Filtros y búsqueda**

   - Componente [`Filtros`](src/components/Filtros.tsx):
     - Búsqueda por **título** o **autor**.
     - Filtros por estado: *Todos, Leídos, Leyendo, Pendientes*.
   - El filtrado se aplica en [`App`](src/App.tsx) combinando:
     - Estado `filtroEstado`
     - Estado `busqueda`
3. **Estadísticas de lectura**

   - Componente [`Estadisticas`](src/components/Estadisticas.tsx):
     - Total de libros.
     - Libros leídos, leyendo y pendientes.
     - Barra de progreso con el porcentaje de libros leídos:
       - $porcentajeLeidos = \dfrac{librosLeidos}{totalLibros} \cdot 100$
4. **Añadir nuevos libros**

   - Formulario controlado [`FormularioLibro`](src/components/FormularioLibro.tsx):
     - Maneja todos los campos con `useState`.
     - Envía el nuevo libro a [`App`](src/App.tsx) mediante la callback `onAgregarLibro`.
5. **Eliminación de libros**

   - Botón de borrado en [`TarjetaLibro`](src/components/TarjetaLibro.tsx) que llama a `onDelete`.
   - [`App`](src/App.tsx) implementa `eliminarLibro`, actualiza el estado y limpia el libro seleccionado si coincide.
6. **Detalle de libro seleccionado**

   - Componente [`DetalleLibro`](src/components/DetalleLibro.tsx):
     - Muestra portada grande, título, autor, año, estado, calificación y reseña.
     - Se abre al seleccionar una tarjeta y se cierra con un botón reutilizable [`Button`](src/components/Button.tsx).
7. **Etiquetas de estado reutilizables**

   - Componente [`EtiquetaEstado`](src/components/EtiquetaEstado.tsx):
     - Se usa en [`TarjetaLibro`](src/components/TarjetaLibro.tsx) y [`DetalleLibro`](src/components/DetalleLibro.tsx).
     - Pinta estilos diferentes según la prop `estado`.

---

## 5. Relación con los requisitos de la práctica

### A. Componentes (mínimo 8)

1. **Componente raíz App**

   - [`App`](src/App.tsx): controla el estado global (`libros`, `libroSeleccionado`, `filtroEstado`, `busqueda`) y coordina a todos los componentes.
2. **Componentes sin props**

   - [`Header`](src/components/Header.tsx): encabezado estático con logo y título.
   - [`Footer`](src/components/Footer.tsx): pie de página estático.
3. **Componentes reutilizables (usados varias veces)**

   - [`TarjetaLibro`](src/components/TarjetaLibro.tsx)
     - Se usa N veces dentro de [`ListaLibros`](src/components/ListaLibros.tsx) con `.map`.
   - [`Button`](src/components/Button.tsx)
     - Botón genérico con variación de color (`color`) y texto (`texto`), usado por ejemplo en [`DetalleLibro`](src/components/DetalleLibro.tsx).
   - [`EtiquetaEstado`](src/components/EtiquetaEstado.tsx)
     - Reutilizado en [`TarjetaLibro`](src/components/TarjetaLibro.tsx) y [`DetalleLibro`](src/components/DetalleLibro.tsx) con distintas props.
4. **Componentes que reciben props para personalizar apariencia o contenido**

   - [`Button`](src/components/Button.tsx)
     - Props: `texto`, `color`, `onClick`.
   - [`Estadisticas`](src/components/Estadisticas.tsx)
     - Props: `libros`, `mostrarTotalLeidos` (permite personalizar contenido).
   - [`EtiquetaEstado`](src/components/EtiquetaEstado.tsx)
     - Prop: `estado` → cambia color y texto.
   - [`TarjetaLibro`](src/components/TarjetaLibro.tsx)
     - Prop opcional `mostrarDetalles` para mostrar/ocultar información extendida.
5. **Componente formulario controlado**

   - [`FormularioLibro`](src/components/FormularioLibro.tsx)
     - Usa `useState` para todos los campos del formulario (título, autor, portada, año, estado, reseña, calificación).
     - Todos los inputs son controlados (`value` + `onChange`).
     - Envía los datos mediante el callback `onAgregarLibro`.
6. **Componentes que reciben funciones callback para cambiar state (comunicación hijo → padre)**

   - [`FormularioLibro`](src/components/FormularioLibro.tsx) → `onAgregarLibro`
   - [`ListaLibros`](src/components/ListaLibros.tsx) → `onSelectLibro`, `onDeleteLibro`
   - [`TarjetaLibro`](src/components/TarjetaLibro.tsx) → `onSelect`, `onDelete`
   - [`Filtros`](src/components/Filtros.tsx) → `onFiltrarEstado`, `onBuscar`
   - [`DetalleLibro`](src/components/DetalleLibro.tsx) → `onClose`

   Todas estas callbacks se definen en [`App`](src/App.tsx) y se pasan por props.
7. **Componente que muestra una lista de elementos**

   - [`ListaLibros`](src/components/ListaLibros.tsx)
     - Renderiza múltiples [`TarjetaLibro`](src/components/TarjetaLibro.tsx) con `.map`.
     - Gestiona el mensaje de lista vacía.
8. **Componente visor / panel de información de un elemento seleccionado**

   - [`DetalleLibro`](src/components/DetalleLibro.tsx)
     - Muestra la información detallada del `libroSeleccionado`.
     - Se renderiza en el panel derecho definido desde [`App`](src/App.tsx).

---

### B. Estados (`useState`)

1. **Estados locales independientes (mínimo 2 componentes)**

   - [`FormularioLibro`](src/components/FormularioLibro.tsx)
     - Varios estados locales: `titulo`, `autor`, `portada`, `año`, `estado`, `resena`, `calificacion`.
   - [`Filtros`](src/components/Filtros.tsx)
     - Estado local `estadoActivo` para saber qué botón de filtro está marcado visualmente.
   - Ambos estados son **independientes** del estado global de [`App`](src/App.tsx).
2. **Estado compartido entre varios componentes**

   En [`App`](src/App.tsx):

   - `libros: Libro[]`

     - **Leído por**:
       - [`ListaLibros`](src/components/ListaLibros.tsx) (muestra la lista filtrada).
       - [`Estadisticas`](src/components/Estadisticas.tsx) (calcula métricas).
       - [`DetalleLibro`](src/components/DetalleLibro.tsx) de forma indirecta, vía `libroSeleccionado`.
     - **Modificado por**:
       - [`FormularioLibro`](src/components/FormularioLibro.tsx) → callback `agregarLibro`.
       - [`TarjetaLibro`](src/components/TarjetaLibro.tsx) → callback `eliminarLibro` (pasando por [`ListaLibros`](src/components/ListaLibros.tsx)).
   - `libroSeleccionado: Libro | null`

     - **Leído por**:
       - [`DetalleLibro`](src/components/DetalleLibro.tsx), que muestra el panel de detalle.
     - **Modificado por**:
       - [`TarjetaLibro`](src/components/TarjetaLibro.tsx) → callback `seleccionarLibro`.
       - Botón de cerrar de [`DetalleLibro`](src/components/DetalleLibro.tsx) → `onClose`.
   - `filtroEstado` y `busqueda`

     - **Leídos por**:
       - [`App`](src/App.tsx) para calcular `librosFiltrados`.
     - **Modificados por**:
       - [`Filtros`](src/components/Filtros.tsx) mediante `onFiltrarEstado` y `onBuscar`.

   Se cumple así el requisito de que **un mismo estado afecta a varios componentes**, y se **modifica siempre mediante callbacks** enviadas desde `App`.

---

### C. Reutilización de componentes

- [`TarjetaLibro`](src/components/TarjetaLibro.tsx)
  - Usada **N veces** en [`ListaLibros`](src/components/ListaLibros.tsx), una por cada libro del array.
- [`EtiquetaEstado`](src/components/EtiquetaEstado.tsx)
  - Reutilizada en:
    - [`TarjetaLibro`](src/components/TarjetaLibro.tsx)
    - [`DetalleLibro`](src/components/DetalleLibro.tsx)
- [`Button`](src/components/Button.tsx)
  - Botón **genérico** parametrizable (`texto`, `color`, `onClick`), usado en el visor de detalle y reutilizable en cualquier otra parte.

Esto demuestra la **reutilización real** de componentes con diferentes props y en contextos distintos.

---

## 6. Tipo de datos `Libro` y datos iniciales

- El tipo principal de la aplicación es [`Libro`](src/types/libro.ts), que define:
  - `id`, `titulo`, `autor`, `portada`, `año`, `estado`, `resena`, `calificacion`.
- Los datos de ejemplo están en [`librosIniciales`](src/data/libros.ts) y se usan como estado inicial de `libros` en [`App`](src/App.tsx).

---

## 7. Posibles mejoras futuras

- Persistencia en `localStorage`.
- Edición de libros existentes.
- Ordenación por año, autor o calificación.
- Más vistas (lista compacta, tabla, etc.).
