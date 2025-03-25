import { CookieOptions } from "express";

// Default configuration for cookies
export const cookieConfig: CookieOptions = {
  httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  // secure: process.env.NODE_ENV === "production", // Only set secure cookies in production
  // sameSite: "none", // Protects against CSRF attacks
  // maxAge: 24 * 60 * 60 * 1000, // Optional: Cookie expiration in milliseconds (1 day)
};
