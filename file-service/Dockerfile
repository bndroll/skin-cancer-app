FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY file-service/package*.json ./
RUN npm install
COPY file-service/. ./
EXPOSE 5050
RUN npm run build
CMD ["node", "dist/main.js"]