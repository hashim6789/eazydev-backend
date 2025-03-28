# Base stage
FROM node:18 AS base
WORKDIR /app
COPY . .  
RUN ls -l /app && cat /app/package.json
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 3333
RUN npm run build  
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

