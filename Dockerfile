FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM builder AS dev
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll=2000"]

FROM builder AS prod-build
RUN npm run build -- --configuration production

FROM nginx:alpine AS prod
COPY --from=prod-build /app/dist/rebobinei /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
