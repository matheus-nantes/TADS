
FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

COPY .env .env

RUN apt-get update && apt-get install -y cron python3 python3-pip python3-venv

COPY collect.py /app/collect.py

RUN python3 -m venv /app/venv

RUN /app/venv/bin/pip install requests

COPY crontab /etc/cron.d/simple-cron

RUN chmod 0644 /etc/cron.d/simple-cron

RUN crontab /etc/cron.d/simple-cron

RUN touch /var/log/cron.log

RUN npx prisma generate

EXPOSE 3334

CMD cron && yarn dev && tail -f /var/log/cron.log
