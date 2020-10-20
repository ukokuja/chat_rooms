FROM node:12.18.2

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . .

ARG VUE_APP_SERVER_INSTANCES
ENV VUE_APP_SERVER_INSTANCES $VUE_APP_SERVER_INSTANCES
EXPOSE 8084
CMD ["npm", "run", "serve", "-- --port 8084"]