import { Router } from "express";
import authRouter from "./authRoutes.js";
import jobRouter from "./jobRoutes.js";
import jobApplicationRouter from "./jobApplicationRoutes.js";
import profileRouter from "./profileRoutes.js";
import userRouter from "./userRoutes.js";

const allRoutes = Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/jobs", jobRouter);
allRoutes.use("/jobApplications", jobApplicationRouter);
allRoutes.use("/profile", profileRouter);
allRoutes.use("/users", userRouter);

export default allRoutes;
