FROM node:8.16.0-alpine

# Install all build dependencies
# Adding bash for debugging purposes
RUN apk update \
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        wget \
        git \
    && apk add bash \
    && apk add sudo \
    && apk add python \
    && npm install knex -g \
    && npm install node-pre-gyp -g \
    && npm install node-gyp -g

WORKDIR '/app'

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install bcrypt
#Install all npm dependencies
#Cleanup
RUN npm install \
    && apk del build-dependencies \
    && rm -rf /var/cache/apk/*
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run migrate && npm run start