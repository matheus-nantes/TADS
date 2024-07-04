FROM node:19

# Set the working directory in the container
WORKDIR /app

RUN yarn install --frozen-lockfile

# Copy the local codebase into the container
COPY . /app

# Expose the port Next.js is running on
EXPOSE 3000

RUN npx next dev -p 3001
