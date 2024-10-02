import express from "express";
import requestPasswordReset from "../controllers/userController.js";

const router = express.Router();

router.post("/request-password-reset", requestPasswordReset);

export default router;
