import JobModel from "../models/Job.js";
import User from "../models/User.js";

const JobController = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await JobModel.findAll({
        include: { model: User, as: "Employer" },
      });
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getJobById: async (req, res) => {
    try {
      const job = await JobModel.findByPk(req.params.id, {
        include: { model: User, as: "Employer" },
      });
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json({ job });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  createJob: async (req, res) => {
    try {
      const { title, description, location, salary } = req.body;

      // Basic input validation
      if (!title || !description || !location || !salary) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const job = await JobModel.create({
        title,
        description,
        location,
        salary,
        employerId: req.user.id,
      });

      res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
      res.status(500).json({ message: "Failed to create job", error });
    }
  },

  updateJob: async (req, res) => {
    const jobId = req.params.id;
    const { title, description } = req.body;

    try {
      const job = await JobModel.findByPk(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      job.title = title;
      job.description = description;
      await job.save();

      res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  deleteJob: async (req, res) => {
    const jobId = req.params.id;

    try {
      const job = await JobModel.findByPk(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      await job.destroy();

      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default JobController;
