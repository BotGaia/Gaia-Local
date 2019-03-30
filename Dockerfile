FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm i nodemon -g
COPY . /app
CMD npm start
EXPOSE 3001