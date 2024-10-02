import express from "express";
import { getQuizQuestions, getTopicosPorArea, updateScore } from "../controllers/quizController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/quiz/:area", getTopicosPorArea);
router.get("/quiz/:area/:topico", getQuizQuestions);
router.put('/update-score', authMiddleware, updateScore);

export default router;
