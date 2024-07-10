import JobModel from "../models/Job.js";
import JobApplicationModel from "../models/JobApplication.js";
import UserModel from "../models/User.js";
import sequelize from "./config.js";

const syncDB = async () => {
  await sequelize.sync({ alter: true, force: true });
  await UserModel.sync({ alter: true, force: true });
  await JobModel.sync({ alter: true, force: true });
  await JobApplicationModel.sync({ alter: true, force: true });
};

export default syncDB;
