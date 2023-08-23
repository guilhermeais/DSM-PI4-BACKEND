FROM node:18-slim

WORKDIR /home/node/app

USER node

CMD npm i --silent && npm run migrate:up