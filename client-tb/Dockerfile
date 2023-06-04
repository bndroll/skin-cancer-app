FROM node:16-alpine as node
WORKDIR /app
COPY client-tb/package*.json ./
RUN npm install
COPY client-tb/. ./
RUN npm run build

FROM nginx:1.13 as prod
COPY --from=node app/build usr/share/nginx/html
COPY client-tb/nginx.conf etc/nginx/conf.d/default.conf
COPY client-tb/ssl/skincancerrecognition.key ssl/skincancerrecognition.key
COPY client-tb/ssl/skincancerrecognition.crt ssl/skincancerrecognition.crt
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
