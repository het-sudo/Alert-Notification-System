const express = require("express");
const router = express.Router();
const controller = require("../controllers/alertController");
const { authMiddleware } = require("../middleware/auth");
const { verify } = require("jsonwebtoken");

router.use(authMiddleware);

router.get("/", authMiddleware, controller.getAlerts);
router.post("/", authMiddleware, controller.createAlert);
router.patch("/:id/read", authMiddleware, controller.toggleRead);
router.patch("/read-all", authMiddleware, controller.markAllRead);
router.delete("/:id", authMiddleware, controller.deleteAlert);
router.get("/external", authMiddleware, controller.getExternalAlerts);

module.exports = router;
