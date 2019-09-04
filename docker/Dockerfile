FROM node:12.9

RUN apt-get update
RUN apt-get install libxml2-utils -y

RUN mkdir /srv/app

ADD . /srv/app

WORKDIR /srv/app

RUN npm i

CMD npm start
