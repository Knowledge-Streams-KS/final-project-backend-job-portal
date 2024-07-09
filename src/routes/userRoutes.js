import { Router } from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", AuthMiddleware, UserController.getAllUsers);
userRouter.get("/:id", AuthMiddleware, UserController.getUserById);
userRouter.delete("/:id", AuthMiddleware, UserController.deleteUser);

export default userRouter;
