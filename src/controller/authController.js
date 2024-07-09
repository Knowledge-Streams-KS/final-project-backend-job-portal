import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

const AuthController = {
  registerJobSeeker: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword, // Store the hashed password
        userType: "jobseeker",
      });
      res
        .status(201)
        .json({ message: "Job seeker registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  signInJobSeeker: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({
        where: { email, userType: "jobseeker" },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Compare hashed passwords
        res
          .status(200)
          .json({ message: "Job seeker signed in successfully", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  registerEmployer: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword, // Store the hashed password
        userType: "employer",
      });
      res
        .status(201)
        .json({ message: "Employer registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  signInEmployer: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({
        where: { email, userType: "employer" },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Compare hashed passwords
        res
          .status(200)
          .json({ message: "Employer signed in successfully", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default AuthController;
