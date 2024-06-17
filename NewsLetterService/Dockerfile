FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY .env .env

RUN npx prisma generate

EXPOSE 3334

CMD ["yarn", "dev"]
