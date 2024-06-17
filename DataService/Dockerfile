FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY .env .env

RUN npx prisma generate

EXPOSE 3333

CMD ["yarn", "dev"]
