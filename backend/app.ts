import express from "express";
import "dotenv/config";
import cors, { CorsOptions } from "cors";
import alertRoutes from "./routes/alertRoutes";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middleware/errorMiddleware";

const app = express();

const corsOptions: CorsOptions = {
  origin: process.env.cors || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
} as const;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/alerts/v1", alertRoutes);
app.use("/auth/v1", authRoutes);

app.use(errorHandler);

export = app;
