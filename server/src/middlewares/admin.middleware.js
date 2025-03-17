import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = (req, _, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new ApiError(403, "You are not authorized to perform this action");
    }
    next();
  } catch (error) {
    throw new ApiError(403, error?.message, "Unauthorized request");
  }
};
