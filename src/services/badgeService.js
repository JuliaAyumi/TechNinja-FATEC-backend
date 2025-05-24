import User from "../models/User.js";

export const checkAndAssignBadges = async (userId, context = {}) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuário não encontrado");

  const earnedBadges = new Set(user.badges);

  // Badge por colocar foto de perfil
  if (
    context.checkAvatarBadge &&
    user.avatar &&
    !earnedBadges.has("perfil_foto")
  ) {
    earnedBadges.add("perfil_foto");
  }

  // Badge por completar primeiro quiz do subtema
  if (
    context.quizSubtema &&
    user.quizzesCompletados.includes(`${context.quizSubtema}`) &&
    !earnedBadges.has(`primeiro_quiz_${context.quizSubtema}`)
  ) {
    earnedBadges.add(`primeiro_quiz_${context.quizSubtema}`);
  }

  // Badge por terminar quiz sem erro
  if (
    context.isPerfect &&
    !earnedBadges.has("quiz_perfeito")
  ) {
    earnedBadges.add("quiz_perfeito");
  }

  user.badges = Array.from(earnedBadges);
  await user.save();

  return user.badges;
};