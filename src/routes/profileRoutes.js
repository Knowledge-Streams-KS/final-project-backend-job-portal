import { Router } from "express";
import ProfileController from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get("/", ProfileController.getProfile);
profileRouter.put("/", ProfileController.updateProfile);

export default profileRouter;
