import { Router } from "express";
import JobApplicationController from "../controllers/jobApplicationController.js";

const jobApplicationRouter = Router();

jobApplicationRouter.get("/", JobApplicationController.getAllJobApplications);
jobApplicationRouter.get(
  "/:id",
  JobApplicationController.getJobApplicationById
);
jobApplicationRouter.post("/", JobApplicationController.createJobApplication);
jobApplicationRouter.put("/:id", JobApplicationController.updateJobApplication);
jobApplicationRouter.delete(
  "/:id",
  JobApplicationController.deleteJobApplication
);

export default jobApplicationRouter;
