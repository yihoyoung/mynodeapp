FROM node:alpine

ADD ./ app/
WORKDIR /app

RUN npm i

EXPOSE 3000

CMD ["node", "app"]