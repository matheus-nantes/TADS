#!/bin/sh

# Aplique as migrações do Prisma
npx prisma migrate deploy

# Inicie a aplicação
exec "$@"
