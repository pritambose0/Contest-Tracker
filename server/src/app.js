import express from "express";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import "./utils/cronjob.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

// Import Routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import contestRouter from "./routes/contest.routes.js";
import solutionRouter from "./routes/solution.routes.js";

// Routes Declarations
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contests", contestRouter);
app.use("/api/v1", solutionRouter);

// app.use(errorHandler);

export { app };
