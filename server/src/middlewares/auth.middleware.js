import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Token: ", req.cookies?.accessToken);

    if (!token) {
      throw new ApiError(401, "Access Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await UserSchema.findById(decodedToken?._id).select(
      "-password"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message, "Invalid Access Token");
  }
});
