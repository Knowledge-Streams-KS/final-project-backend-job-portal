import { Router } from "express";
import AuthController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/jobseeker/register", AuthController.registerJobSeeker);
authRouter.post("/jobseeker/signin", AuthController.signInJobSeeker);
authRouter.post("/employer/register", AuthController.registerEmployer);
authRouter.post("/employer/signin", AuthController.signInEmployer);

export default authRouter;
