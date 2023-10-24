FROM node:16-alpine

EXPOSE 4002

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD npm start