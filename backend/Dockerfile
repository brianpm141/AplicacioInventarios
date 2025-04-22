# Usamos Node 18 en su variante Alpine para ahorrar espacio
FROM node:18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos package.json + package-lock.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos todo el código
COPY . .

# Exponemos el puerto donde corre tu Express (por ejemplo 3000)
EXPOSE 3000

# Comando para iniciar tu API (ajusta según tu script)
CMD ["npm", "run", "dev"]
