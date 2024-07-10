import UserModel from "../models/User.js";

const ProfileController = {
  getProfile: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.user.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      const user = await UserModel.findByPk(req.user.id);
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      user.fullName = fullName;
      user.email = email;
      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default ProfileController;
