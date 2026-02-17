# 📚 NubeLectora

**NubeLectora** es una aplicación web para gestionar tu biblioteca personal en la nube. Permite organizar, rastrear y calificar tus libros con una interfaz moderna y funcional.

## 👨‍💻 Autor

**Francisco Pérez**
Ciclo Superior - Entorno Cliente
Curso: 2025/2026

---

## 📝 Descripción

Aplicación frontend desarrollada con **React + TypeScript** que se comunica con un backend mediante una **API REST**. Permite realizar operaciones CRUD completas sobre libros, con autenticación JWT y rutas protegidas.

### Características principales

- ✅ Gestión completa de libros (CRUD)
- ✅ Autenticación con JWT
- ✅ Rutas públicas y privadas
- ✅ Página 404 para rutas inexistentes
- ✅ Filtrado y búsqueda de libros
- ✅ Estadísticas de lectura
- ✅ Interfaz responsive y moderna
- ✅ Estados de carga y error
- ✅ Persistencia de sesión

---

## 🚀 Instalación

### Requisitos previos

- **Node.js** (v18 o superior)
- **npm** o **yarn**

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/nubelectora.git
cd NubeLectora
```

2. **Instalar dependencias del frontend**

```bash
npm install
```

3. **Instalar dependencias del backend**

```bash
cd backend
npm install
cd ..
```

4. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```env
VITE_API_URL=http://localhost:3000
```

5. **Iniciar la aplicación**

**Opción A: Con Docker (Recomendado) - Frontend + Backend**

Si tienes Docker instalado, puedes iniciar **ambos servicios** con un solo comando:

```bash
docker-compose up
```

O en modo detached (segundo plano):

```bash
docker-compose up -d
```

Para detener los contenedores:

```bash
docker-compose down
```

Esto lanzará:

- **Backend (API)**: `http://localhost:3000`
- **Frontend**: `http://localhost:5173`

**Opción B: Con Node.js (desarrollo manual)**

Terminal 1 - Backend:

```bash
cd backend
node server.js
```

Terminal 2 - Frontend:

```bash
npm run dev
```

El backend se ejecutará en `http://localhost:3000`
El frontend se ejecutará en `http://localhost:5173`

---

## 🐳 Ejecutar con Docker

El proyecto incluye configuración de Docker Compose para ejecutar **frontend y backend** simultáneamente:

### Requisitos

- Docker Desktop instalado ([Descargar aquí](https://www.docker.com/products/docker-desktop))

### Contenedores incluidos

1. **nubelectora-api** (puerto 3000)

   - Backend con Express + JSON Server
   - Base de datos JSON persistente
2. **nubelectora-frontend** (puerto 5173)

   - Frontend React con Vite
   - Build optimizado para producción

### Comandos útiles

```bash
# Iniciar frontend y backend a la vez
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Ver logs de ambos servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f frontend
docker-compose logs -f api

# Detener todos los servicios
docker-compose down

# Reconstruir las imágenes (después de cambios)
docker-compose up --build

# Reconstruir solo un servicio
docker-compose build frontend
docker-compose up -d frontend

# Detener y eliminar volúmenes
docker-compose down -v
```

### Ventajas de usar Docker

- ✅ No necesitas instalar Node.js localmente
- ✅ Entorno consistente en todos los sistemas
- ✅ **Inicia frontend y backend con un solo comando**
- ✅ Fácil de iniciar y detener
- ✅ Los datos se persisten en `backend/db.json`
- ✅ Build de producción con Vite preview

---

## 👤 Usuarios de prueba

El backend incluye dos usuarios precargados:

| Email                 | Contraseña  | Rol               |
| --------------------- | ------------ | ----------------- |
| `usuario@gmail.com` | `password` | Usuario estándar |
| `admin@gmail.com`   | `password` | Administrador     |

Cada usuario tiene su propia colección de libros.

---

## 🏗️ Estructura del proyecto

```
NubeLectora/
├── backend/                 # Backend con Express + JSON Server
│   ├── db.json             # Base de datos
│   ├── db.json.dist        # Plantilla de base de datos
│   ├── server.js           # Servidor API REST
│   └── package.json        # Dependencias del backend
├── src/
│   ├── auth/               # Contexto y almacenamiento de autenticación
│   │   ├── authContext.tsx
│   │   └── authStorage.ts
│   ├── components/         # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── DetalleLibro.tsx
│   │   ├── Estadisticas.tsx
│   │   ├── EtiquetaEstado.tsx
│   │   ├── Filtros.tsx
│   │   ├── Footer.tsx
│   │   ├── FormularioLibro.tsx
│   │   ├── Header.tsx
│   │   ├── ListaLibros.tsx
│   │   └── TarjetaLibro.tsx
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── LibrosPage.tsx
│   │   ├── DetalleLibroPage.tsx
│   │   └── NotFound.tsx
│   ├── routing/            # Componentes de enrutamiento
│   │   └── PrivateRoute.tsx
│   ├── services/           # Servicios de API
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   └── librosService.ts
│   ├── types/              # Tipos TypeScript
│   │   ├── Auth.ts
│   │   └── libro.ts
│   ├── App.tsx             # Componente raíz con rutas
│   └── main.tsx            # Punto de entrada
├── .env                    # Variables de entorno
├── package.json            # Dependencias del frontend
└── README.md              # Este archivo
```

---

## 🛣️ Rutas de la aplicación

### Rutas públicas (accesibles sin autenticación)

- `/` - Página de inicio/presentación
- `/login` - Página de inicio de sesión
- `/register` - Página de registro de nuevos usuarios

### Rutas privadas (requieren autenticación)

- `/libros` - Lista de libros del usuario
- `/libros/:id` - Detalle de un libro específico

### Ruta de error

- `*` - Página 404 para rutas inexistentes

---

## 🔌 API Endpoints

El backend proporciona los siguientes endpoints:

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/me` - Obtener usuario actual (requiere JWT)

### Libros (requieren JWT)

- `GET /libros` - Obtener todos los libros del usuario
- `GET /libros/:id` - Obtener un libro específico
- `POST /libros` - Crear un nuevo libro
- `PATCH /libros/:id` - Actualizar un libro (parcial)
- `PUT /libros/:id` - Actualizar un libro (completo)
- `DELETE /libros/:id` - Eliminar un libro

---

## 🛠️ Tecnologías utilizadas

### Frontend

- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **CSS3** - Estilos

### Backend

- **Express** - Framework de servidor
- **JSON Server** - Mock API REST
- **JWT** - Autenticación
- **bcrypt** - Hash de contraseñas
- **CORS** - Habilitación de CORS

---

## ✅ Checklist de requisitos cumplidos

### Requisitos funcionales

- ✅ Página pública de inicio
- ✅ Página pública de login
- ✅ Almacenamiento del JWT
- ✅ Rutas protegidas (PrivateRoute)
- ✅ Página 404
- ✅ Listado de libros (GET)
- ✅ Consulta de detalles (GET)
- ✅ Alta de libros (POST)
- ✅ Edición de libros (PATCH/PUT)
- ✅ Eliminación de libros (DELETE)
- ✅ Gestión de errores de API
- ✅ Estados de carga
- ✅ Estados vacíos

### Requisitos técnicos

- ✅ React + TypeScript
- ✅ React Router (rutas públicas, privadas, 404)
- ✅ Hooks (useState, useEffect, useContext, useMemo)
- ✅ Manejo de eventos (onClick, onSubmit, onChange)
- ✅ async/await
- ✅ Servicios separados para API
- ✅ Componentes reutilizables
- ✅ Diseño basado en componentes

### Diseño/UI

- ✅ Componentes reutilizables (Button, Card, etc.)
- ✅ Feedback visual (mensajes, alertas)
- ✅ Interfaz coherente y consistente
- ✅ Diseño responsive

---

## 📦 Scripts disponibles

```bash
# Frontend
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
npm run lint         # Ejecutar linter

# Backend
cd backend
node server.js       # Iniciar servidor backend
```

---

## 🔐 Seguridad

- JWT almacenado en `localStorage`
- Interceptor de Axios para agregar automáticamente el token
- Redirección automática al login cuando el token expira
- Validación de datos en el backend
- Protección de contraseñas con bcrypt

---

## 📄 Licencia

Este proyecto fue desarrollado como práctica final para el módulo de Entorno Cliente.

---

## 🤝 Contribuciones

Este es un proyecto académico, pero si deseas mejorarlo:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

---

## 📞 Contacto

Para cualquier consulta o sugerencia sobre el proyecto, puedes contactarme a través de GitHub.

---

**Desarrollado por Francisco Pérez - 2026**
