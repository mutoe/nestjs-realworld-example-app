FROM node:12-alpine AS dependencies
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:12-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./
EXPOSE 3000
CMD [ "node", "dist/main" ]
