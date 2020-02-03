FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production

ENV WORKERNAME="jwt01"
ENV RABBITMQUSER="broker"
ENV RABBITMQPASS="broker"
ENV RABBITMQHOST="192.168.1.150"
ENV RABBITMQPORT="5672"
ENV JWTEXPIREIN="500000"

COPY jwtWorker.js .
CMD [ "node", "jwtWorker.js" ]