FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn global add @quasar/cli
RUN yarn install
RUN quasar build -m ssr

CMD [ "node", "dist/ssr/index.js" ]
