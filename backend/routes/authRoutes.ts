import express from "express";
import * as controller from "../controllers/authController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", authMiddleware, controller.logout);

export = router;
