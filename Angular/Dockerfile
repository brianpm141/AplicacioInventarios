FROM node:24-slim

WORKDIR /app

COPY AppInventarios/package*.json ./
RUN npm install

COPY AppInventarios/. .

EXPOSE 4200
CMD ["npm", "start"]
