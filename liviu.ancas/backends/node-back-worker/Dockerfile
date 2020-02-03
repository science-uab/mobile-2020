FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production

ENV WORKERNAME="pbu01"
ENV SQLPASSWORD="phpRandomPasswordAPI"
ENV SQLUSERNAME="php_api"
ENV SQLHOSTNAME="192.168.1.150"
ENV SQLPORT="3307"
ENV SQLDB="firmaX"
ENV RABBITMQUSER="broker"
ENV RABBITMQPASS="broker"
ENV RABBITMQHOST="192.168.1.150"
ENV RABBITMQPORT="5672"

COPY worker.js .
COPY sqlQuery.js .
CMD [ "node", "worker.js" ]