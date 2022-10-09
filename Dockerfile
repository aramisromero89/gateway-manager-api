FROM node:16.17.0

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD ["node", "dist/main"]
