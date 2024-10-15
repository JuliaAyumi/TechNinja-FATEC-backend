import express from "express";
import { getCompletedQuizzes, getQuizQuestions, getTopicosPorArea, markQuizCompleted, updateScore } from "../controllers/quizController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/quiz/:area", getTopicosPorArea);
router.get("/quiz/:area/:topico", getQuizQuestions);
router.get("/user-quizzes-completed", authMiddleware, getCompletedQuizzes);
router.put('/update-score', authMiddleware, updateScore);
router.put('/mark-quiz-completed', authMiddleware, markQuizCompleted);

export default router;
