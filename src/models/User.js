import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM("jobseeker", "employer"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
