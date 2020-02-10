# build stage
FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN yarn global add @quasar/cli
RUN yarn install
RUN quasar build -m ssr

WORKDIR /app/dist/ssr

CMD [ "yarn", "start" ]
