import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserSchema } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await UserSchema.exists({
    $or: [{ username }, { email }],
  });

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await UserSchema.create({ username, email, password });

  if (!newUser) {
    throw new ApiError(400, "User creation failed");
  }
  const createdUser = await UserSchema.findById(newUser._id).select(
    "-password"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Username or Email is required");
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User does not exist");
  }
  // console.log("Password: ", password);

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const accessToken = user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, user, "User Logged in Successfully"));
});

const logoutUser = asyncHandler(async (_, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .clearCookie("accessToken", options)
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getAllBookmarks = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await UserSchema.findById(_id).populate("bookmarks");

  return res
    .status(200)
    .json(
      new ApiResponse(200, user.bookmarks, "Bookmarks fetched successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized request");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getAllBookmarks, getCurrentUser };
