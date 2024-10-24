FROM node:lts-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 3000

CMD ["node", "src/app.js"]