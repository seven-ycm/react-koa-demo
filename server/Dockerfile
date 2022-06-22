FROM node:16.13.1
WORKDIR /usr/project/react-koa-demo/server
COPY . /usr/project/react-koa-demo/server

RUN npm install

EXPOSE 18090
#CMD ["node", "server.js"]
CMD pm2 start server.js --no-daemon