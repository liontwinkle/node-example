FROM node:latest

MAINTAINER Computools Software

WORKDIR /home/node

COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]
