FROM node:24-slim

WORKDIR /app

COPY ./Express/package*.json ./
RUN npm install

COPY ./Express ./

CMD ["npm", "start"]
