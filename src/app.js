import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/config.js";
import syncDB from "./db/init.js";
import allRoutes from "./routes/allRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

connectDB();

syncDB().then(() => {
  console.log("DB synced");
});

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions)); // Add CORS middleware here

app.use(express.json());

app.use("/", allRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
