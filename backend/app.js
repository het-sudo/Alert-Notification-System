const express = require("express");
require("dotenv").config();
const cors = require("cors");
const alertRoutes = require("./routes/alertRoutes");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

const corsOptions = {
  origin: process.env.cors || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/alerts/v1", alertRoutes);
app.use("/auth/v1", authRoutes);

app.use(errorHandler);

module.exports = app;
