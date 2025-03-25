# version: "3.8"

services:
  express:
    container_name: eazy-dev-express
    build:
      context: .
    volumes:
      - .:/app
      - /app/node_modules
    working_dir: /app
    ports:
      - "3333:3333"
    environment:
      - FRONTEND_HOST=${FRONTEND_HOST}
      - BACKEND_HOST=${BACKEND_HOST}
      - PORT=${PORT}
      - MONGO_URI=${MONGO_URI}
      - JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
      - KEY_OF_ACCESS=${KEY_OF_ACCESS}
      - KEY_OF_REFRESH=${KEY_OF_REFRESH}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - SESSION_SECRET=${SESSION_SECRET}
      - NODE_ENV=${NODE_ENV}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASS=${EMAIL_PASS}
      - REDIS_PASSWORD=${REDIS_PASSWORD}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - CACHE_KEY_GET_ALL_COURSES=${CACHE_KEY_GET_ALL_COURSES}
      - CACHE_KEY_GET_ALL_MENTOR_COURSES=${CACHE_KEY_GET_ALL_MENTOR_COURSES}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - AWS_REGION=${AWS_REGION}
      - AWS_BUCKET_NAME=${AWS_BUCKET_NAME}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - ADMIN_ID=${ADMIN_ID}

    command: npm run dev
    networks:
      - app-network

  nginx:
    container_name: eazy-dev-nginx
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - express
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
