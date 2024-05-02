import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  // console.log("req",req)
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log("Cookies:",token)
  if (!token) throw new ApiError(401, "Unauthorized request");
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decode?._id).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(401, "Invalid Access Token");
  req.user = user;
  next();
});
