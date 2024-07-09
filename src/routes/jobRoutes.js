import { Router } from "express";
import JobController from "../controllers/jobController.js";

const jobRouter = Router();

// Example of correct route definitions
jobRouter.get("/", JobController.getAllJobs);
jobRouter.get("/:id", JobController.getJobById);
jobRouter.post("/", JobController.createJob);
jobRouter.put("/:id", JobController.updateJob); // Correct usage of put
jobRouter.delete("/:id", JobController.deleteJob);

export default jobRouter;
