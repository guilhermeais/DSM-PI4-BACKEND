FROM node:16-slim

WORKDIR /home/node/app

COPY ./package.json package.json 
COPY ./package-lock.json package-lock.json 

RUN npm i

COPY . .