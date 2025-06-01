import express from "express";
import { handleGenerateSecret, handleVerifyToken } from "../controllers/2FAController.js";

const router = express.Router();

router.post("/generate-secret", handleGenerateSecret);

router.post("/verify-token", handleVerifyToken);

export default router;