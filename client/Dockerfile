FROM node:8.16.0-alpine as builder

WORKDIR 'app/client'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# we are now going to copy over app/client/build
FROM nginx
COPY --from=builder /app/client/build /usr/share/nginx/html