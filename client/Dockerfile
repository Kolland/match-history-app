FROM node:12-alpine as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --output-path=./dist/out --prod

# Stage 2: Serve Angular assets using NGINX
FROM nginx:1.15.2-alpine

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/out /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]