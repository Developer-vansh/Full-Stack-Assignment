import express from "express";
import cors from "cors";
import rateLimiter from "./config/rateLimitConfig.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

// for body parser
app.use(express.json());

//for url params
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
app.use(rateLimiter);

//Server Working
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.use(cors());

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;
