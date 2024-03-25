# npm ci doesn't start without it
FROM node:20-alpine as predev
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i

FROM node:20-alpine as dev
WORKDIR /usr/src/app
COPY --from=predev /usr/src/app/package*.json .
RUN npm ci
COPY . .

FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY --from=dev /usr/src/app/package*.json .
COPY --from=dev /usr/src/app/node_modules ./node_modules
COPY . .

CMD npm run typeorm -- migration:run && npm run start:dev
