FROM node:8-alpine
MAINTAINER Muhammad Arizal Saputro <muhammadarizals1@gmail.com>

WORKDIR /app

ADD . /app

RUN npm install \
    && npm run generate

FROM nginx:1.12-alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
