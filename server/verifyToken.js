import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(handleError(401, "You are not authenticated"));
  jwt.verify(token, "s1e2c3r4e5t6", (err, user) => {
    if (err) return next(handleError(403, "Invalid token"));
    req.user = user;
    next();
  });
};
