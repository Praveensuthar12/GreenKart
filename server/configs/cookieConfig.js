// Shared cookie configuration used across auth controllers.
// In production the frontend and backend live on different origins,
// so the cookie must be cross-site (sameSite: "none") and sent only
// over HTTPS (secure: true).
// In development we use a more permissive, browser-friendly setting so
// login works on both desktop (localhost) and mobile (LAN IP).
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

export const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export const cookieOptionsWithAge = (options) => ({
  ...cookieOptions,
  maxAge: COOKIE_MAX_AGE,
});
