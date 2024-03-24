FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .
