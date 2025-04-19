FROM node:22.14.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

FROM node:22.14.0-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist/front-blog/browser /app

EXPOSE 80

CMD ["http-server", "-p", "80"]
