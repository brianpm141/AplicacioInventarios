FROM node:24-slim

WORKDIR /app

# 1) Copiamos sólo package.json y lock y luego instalamos
COPY ./Express/package*.json ./
RUN npm install

# 2) Copiamos el resto del código
COPY ./Express ./

# 3) Documentamos el puerto que usamos
EXPOSE 3000

# 4) Arrancamos con el script "start" de tu package.json
CMD ["npm", "start"]
