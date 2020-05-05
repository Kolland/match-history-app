FROM node:12-alpine as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
ENV NODE_ENV=development

ENTRYPOINT ["npm", "run", "start"]