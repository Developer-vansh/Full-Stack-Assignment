import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//register User
const registerUser = asyncHandler(async (req, res) => {
  //get User details from frontend
  const { username, email, password } = req.body;

  //validation-not empty
  if ([username, email, password].some((value) => value.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  //check if User already exists :email
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }
  //create user object  entry in db
  const user = await User.create({
    username,
    email,
    password,
  });

  // generate access and refresh token
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user);

  // remove password field from response
  const createdUser = await User.findById(user._id).select("-password");

  // check for User creation
  if (!createdUser) throw new ApiError(500, "User creation failed");

  // add access token to createdUser
  createdUser.accessToken = accessToken;
  // return response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { accessToken, refreshToken },
        "User created successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //get refresh token from user
  const incomingRefershToken = req.body.refreshToken;
  if (!incomingRefershToken) throw new ApiError(401, "Unauthorized request");
  // decode  token
  const decoded = jwt.verify(
    incomingRefershToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decoded?._id);
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  // verify token with the token stored in the user db
  if (user.refreshToken !== incomingRefershToken) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  // if valid, generateAccessAndRefreshToken
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access Token Refreshed Successusery"
      )
    );
});

//generate access and refresh token
const generateAccessAndRefreshToken = async (user) => {
  try {
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong While Generating Token");
  }
};

export { registerUser, refreshAccessToken };
