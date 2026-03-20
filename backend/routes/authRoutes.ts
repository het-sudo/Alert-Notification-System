import express from "express";
import * as controller from "../controllers/authController";
import authMiddleware from "../middleware/auth";
import { getReadAlerts } from "../controllers/alertController";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", authMiddleware, controller.logout);
router.get("/read", authMiddleware, getReadAlerts);

export = router;
