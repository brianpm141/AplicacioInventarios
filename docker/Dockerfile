# Usa Node 24 como base
FROM node:24-slim

# Directorio de trabajo
WORKDIR /app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia dependencias
COPY AppInventarios/package*.json ./

# Instala dependencias del proyecto
RUN npm install

# Copia todo el código fuente
COPY AppInventarios/ .

# Exponer el puerto del dev server
EXPOSE 4200

# Comando para levantar servidor de desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll=1000"]
