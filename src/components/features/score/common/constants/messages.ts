export const messages = {
  titles: {
    quizCompleted: 'Quiz Completed 🎉',
    score: (correct: number, total: number): string => `Score: ${correct} / ${total}`,
  },
  messages: {
    perfect: 'Perfect score! You really know this topic.',
    greatJob: 'Great job! You have strong knowledge.',
    notBad: 'Not bad. A bit more practice will help.',
    keepLearning: 'Keep learning! Try again to improve your score.',
  },
};
