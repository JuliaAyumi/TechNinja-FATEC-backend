import express from "express";
import { getCompletedQuizzes, getDificuldadesPorSubtema, getQuizQuestions, getTemasPorArea, markQuizCompleted, updateScore } from "../controllers/quizController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/quiz/:area", getTemasPorArea);
router.get("/quiz/:tema/:subtema/dificuldades", getDificuldadesPorSubtema);
router.get("/quiz/:tema/:subtema/:dificuldade", getQuizQuestions);
router.get("/user-quizzes-completed", authMiddleware, getCompletedQuizzes);
router.put('/update-score', authMiddleware, updateScore);
router.put('/mark-quiz-completed', authMiddleware, markQuizCompleted);

export default router;
