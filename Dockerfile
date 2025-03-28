# Base stage
FROM node:18 AS base
WORKDIR /app
COPY . .  
RUN ls -l /app && cat /app/package.json
RUN npm install
COPY . .
EXPOSE 3333
RUN npm run build  
CMD ["npm", "start"]

