FROM node:12.9

RUN apt-get update
RUN apt-get install libxml2-utils -y

RUN mkdir /srv/app

ADD . /srv/app

WORKDIR /srv/app

RUN npm i

RUN npm i -g pm2 ts-node typescript

RUN npm run dev:build &

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
