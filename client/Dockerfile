FROM node:alpine as build

WORKDIR /app/

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "echo", "done building"]

FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
EXPOSE 3000
COPY --from=build /app/build .
COPY ./default.conf /etc/nginx/conf.d/default.conf


