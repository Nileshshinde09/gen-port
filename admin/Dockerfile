FROM node:18-alpine

RUN mkdir -p app/admin
WORKDIR /app/admin

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]