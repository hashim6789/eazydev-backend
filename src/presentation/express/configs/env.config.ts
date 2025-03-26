import { config } from "dotenv";
config();

export const env = {
  get FRONTEND_HOST() {
    return process.env.FRONTEND_HOST;
  },
  get BACKEND_HOST() {
    return process.env.BACKEND_HOST;
  },
  get DOMAIN() {
    return process.env.DOMAIN;
  },
  get PORT() {
    return process.env.PORT;
  },
  get PEER_PORT() {
    return process.env.PEER_PORT;
  },
  get MONGO_URI() {
    return process.env.MONGO_URI;
  },
  get JWT_ACCESS_SECRET() {
    return process.env.JWT_ACCESS_SECRET;
  },
  get JWT_REFRESH_SECRET() {
    return process.env.JWT_REFRESH_SECRET;
  },
  get KEY_OF_ACCESS() {
    return process.env.KEY_OF_ACCESS;
  },
  get KEY_OF_REFRESH() {
    return process.env.KEY_OF_REFRESH;
  },
  get KEY_OF_RESET() {
    return process.env.KEY_OF_RESET;
  },
  get CLOUDINARY_API_KEY() {
    return process.env.CLOUDINARY_API_KEY;
  },
  get CLOUDINARY_API_SECRET() {
    return process.env.CLOUDINARY_API_SECRET;
  },
  get CLOUDINARY_CLOUD_NAME() {
    return process.env.CLOUDINARY_CLOUD_NAME;
  },
  get SESSION_SECRET() {
    return process.env.SESSION_SECRET;
  },
  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
  get EMAIL_USER() {
    return process.env.EMAIL_USER;
  },
  get EMAIL_PASS() {
    return process.env.EMAIL_PASS;
  },
  get REDIS_PASSWORD() {
    return process.env.REDIS_PASSWORD;
  },
  get REDIS_HOST() {
    return process.env.REDIS_HOST;
  },
  get REDIS_PORT() {
    return process.env.REDIS_PORT;
  },
  get CACHE_KEY_GET_ALL_COURSES() {
    return process.env.CACHE_KEY_GET_ALL_COURSES;
  },
  get CACHE_KEY_GET_ALL_MENTOR_COURSES() {
    return process.env.CACHE_KEY_GET_ALL_MENTOR_COURSES;
  },
  get AWS_ACCESS_KEY_ID() {
    return process.env.AWS_ACCESS_KEY_ID;
  },
  get AWS_SECRET_ACCESS_KEY() {
    return process.env.AWS_SECRET_ACCESS_KEY;
  },
  get AWS_REGION() {
    return process.env.AWS_REGION;
  },
  get AWS_BUCKET_NAME() {
    return process.env.AWS_BUCKET_NAME;
  },
  get STRIPE_SECRET_KEY() {
    return process.env.STRIPE_SECRET_KEY;
  },
  get ADMIN_ID() {
    return process.env.ADMIN_ID;
  },
};
