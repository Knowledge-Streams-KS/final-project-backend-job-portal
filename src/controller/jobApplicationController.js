import JobApplicationModel from "../models/JobApplication.js";

const JobApplicationController = {
  // GET all job applications
  getAllJobApplications: async (req, res) => {
    try {
      const jobApplications = await JobApplicationModel.findAll();
      res.status(200).json({ jobApplications });
    } catch (error) {
      console.error("Error fetching all job applications:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // GET job application by ID
  getJobApplicationById: async (req, res) => {
    try {
      const jobApplication = await JobApplicationModel.findByPk(req.params.id);
      if (!jobApplication) {
        return res.status(404).json({ message: "Job application not found" });
      }
      res.status(200).json({ jobApplication });
    } catch (error) {
      console.error(
        `Error fetching job application with ID ${req.params.id}:`,
        error
      );
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // CREATE job application
  createJobApplication: async (req, res) => {
    try {
      const { jobId } = req.body;
      const resume = req.file.path;
      const jobApplication = await JobApplicationModel.create({
        jobId,
        jobseekerId: req.user.id,
        resume,
      });
      res.status(201).json({
        message: "Job application created successfully",
        jobApplication,
      });
    } catch (error) {
      console.error("Error creating job application:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // UPDATE job application by ID
  updateJobApplication: async (req, res) => {
    try {
      const { jobId } = req.body;
      const resume = req.file.path;
      let jobApplication = await JobApplicationModel.findByPk(req.params.id);
      if (!jobApplication) {
        return res.status(404).json({ message: "Job application not found" });
      }
      jobApplication = await jobApplication.update({
        jobId,
        jobseekerId: req.user.id,
        resume,
      });
      res.status(200).json({
        message: "Job application updated successfully",
        jobApplication,
      });
    } catch (error) {
      console.error(
        `Error updating job application with ID ${req.params.id}:`,
        error
      );
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // DELETE job application by ID
  deleteJobApplication: async (req, res) => {
    try {
      const jobApplication = await JobApplicationModel.findByPk(req.params.id);
      if (!jobApplication) {
        return res.status(404).json({ message: "Job application not found" });
      }
      await jobApplication.destroy();
      res.status(200).json({ message: "Job application deleted successfully" });
    } catch (error) {
      console.error(
        `Error deleting job application with ID ${req.params.id}:`,
        error
      );
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

export default JobApplicationController;
