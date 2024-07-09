import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import JobModel from "./Job.js";
import UserModel from "./User.js";

const JobApplicationModel = sequelize.define("JobApplication", {
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: JobModel,
      key: "id",
    },
  },
  jobseekerId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

JobModel.hasMany(JobApplicationModel, { foreignKey: "jobId" });
JobApplicationModel.belongsTo(JobModel, { foreignKey: "jobId" });

UserModel.hasMany(JobApplicationModel, { foreignKey: "jobseekerId" });
JobApplicationModel.belongsTo(UserModel, { foreignKey: "jobseekerId" });

export default JobApplicationModel;
