FROM node:12.18.2

WORKDIR /usr/src/app_client

COPY package*.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . .

EXPOSE 8084
CMD ["npm", "run", "serve", "-- --port 8084"]