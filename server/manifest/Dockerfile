FROM node:18-alpine
WORKDIR /server
COPY package*.json ./
RUN npm install && mkdir cover_images
COPY . .

EXPOSE 3001
CMD [ "npm", "run", "start" ]
