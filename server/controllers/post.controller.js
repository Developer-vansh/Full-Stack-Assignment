import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// get all posts
const getPosts = asyncHandler(async (req, res) => {
  const {page, pageSize} = req.params;
  console.log(req.params)
  // get all posts
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=2024-04-02&sortBy=publishedAt&apiKey=${process.env.NEWS_API}&page=${page}&pageSize=${pageSize}`
  );
  const posts = await response.json();

  // check for posts
  if (!posts.articles || posts.articles.length === 0) {
    throw new ApiError(500, "No posts found");
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

export { getPosts };
