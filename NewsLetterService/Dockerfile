# Use a imagem base Node.js
FROM node:18

# Diretório de trabalho no contêiner
WORKDIR /app

# Instalação das dependências do Node.js
COPY package.json yarn.lock ./
RUN yarn install

# Copia os arquivos da aplicação
COPY . .

# Copia o arquivo de variáveis de ambiente
COPY .env .env

# Instalação das dependências do sistema e do Python
RUN apt-get update && apt-get install -y cron python3 python3-pip python3-requests

# Configuração do cron job
COPY crontab /etc/cron.d/simple-cron
RUN chmod 0644 /etc/cron.d/simple-cron
RUN crontab /etc/cron.d/simple-cron
RUN touch /var/log/cron.log

# Gera os arquivos Prisma
RUN npx prisma generate

# Copia o script de inicialização para o contêiner
COPY entrypoint.sh /app/entrypoint.sh

# Define o script de inicialização como ENTRYPOINT
ENTRYPOINT ["/app/entrypoint.sh"]

# Expõe a porta necessária para a aplicação Node.js
EXPOSE 3334

# Comando padrão para iniciar o cron e o servidor Node.js
CMD ["sh", "-c", "cron && yarn dev && tail -f /var/log/cron.log"]
