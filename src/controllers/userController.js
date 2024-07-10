import UserModel from "../models/User.js";

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default UserController;
