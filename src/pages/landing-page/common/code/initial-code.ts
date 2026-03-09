export const initialCode = `// Why developers need Tandem Training:
const jsQuirks = {
  isMathReal: Math.max() > Math.min(), // false
  isNullAnObject: typeof null === 'object', // true
  isBanana: ('b' + 'a' + + 'a' + 'a').toLowerCase(), // 'banana'
  isLogicBroken: [] == ![] // true
};

export const evaluateCandidate = (panicLevel: number): string => {
  if (panicLevel > 9000) {
    return 'Go practice in Tandem Widget Arena!';
  }
  return 'You are hired!';
};
`;
