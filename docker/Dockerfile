# Usa Node 24 como base
FROM node:24-slim

# Instala Bun
RUN curl -fsSL https://bun.sh/install | bash

# Agrega Bun al PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Crea directorio de trabajo
WORKDIR /app

# Copia package.json y bun.lockb
COPY AppInventarios/package.json AppInventarios/bun.lockb ./

# Instala dependencias
RUN bun install

# Copia todo el proyecto
COPY AppInventarios/ .

# Construir la aplicación
RUN bun run ng build --configuration production

# Instala un servidor para servir la app
RUN bun add -g http-server

# Exponer el puerto
EXPOSE 8080

# Comando de inicio
CMD ["http-server", "dist/AppInventarios", "-p", "8080"]
