FROM node:18-alpine as a builder
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start" ]

