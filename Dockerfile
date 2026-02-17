FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 5173
EXPOSE 5173

# Servir la aplicación con Vite preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
