import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import User from "./User.js";

const JobModel = sequelize.define(
  "Job",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

JobModel.belongsTo(User, { as: "Employer", foreignKey: "employerId" });
User.hasMany(JobModel, { foreignKey: "employerId" });

export default JobModel;
