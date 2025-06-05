# Usa Node 23 como base
FROM node:23-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias desde ./AppInventarios
COPY AppInventarios/package*.json ./

# Instala dependencias
RUN npm install

# Instala Angular CLI globalmente si es necesario
RUN npm install -g @angular/cli

# Copia el resto del código fuente
COPY AppInventarios/ ./

# Expone el puerto que usa Angular
EXPOSE 4200

# Comando por defecto para desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll=1000"]
