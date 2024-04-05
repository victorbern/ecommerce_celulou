FROM node:20.12-alpine as development

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .