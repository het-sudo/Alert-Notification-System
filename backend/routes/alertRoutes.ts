import express from "express";
import * as controller from "../controllers/alertController";
import authMiddleware from "../middleware/auth";
import Alert from "../models/alertModal";

const router = express.Router();

router.use(authMiddleware);

router.get("/", controller.getAlerts);
router.post("/", controller.createAlert);
router.patch("/:id/read", controller.toggleRead);
router.patch("/read-all", controller.markAllRead);
router.delete("/:id", controller.deleteAlert);
router.get("/external", controller.getExternalAlerts);

export = router;
