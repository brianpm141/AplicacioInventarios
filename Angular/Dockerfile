FROM node:24-slim

WORKDIR /app

# Solo copiamos package.json y se instalan dependencias
COPY AppInventarios/package*.json ./
RUN npm install

# El código fuente NO se copia. Será montado como volumen.

EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]
