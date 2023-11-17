FROM node:alpine

WORKDIR /app

COPY . .

COPY ./package.json .

RUN npm install

CMD ["nx","serve","dethroll-api"]