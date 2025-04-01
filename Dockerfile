# Base image
FROM node:18 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .

# Install PM2 globally
RUN npm install -g pm2

# Expose backend port
EXPOSE 3333
RUN npm run build

# Run app with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
