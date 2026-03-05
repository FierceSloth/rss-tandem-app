export const initialCode = `// Why developers need Tandem Training:
const jsQuirks = {
  isMathReal: Math.max() > Math.min(),
  isNullAnObject: typeof null === 'object',
  isBanana: ('b' + 'a' + + 'a' + 'a').toLowerCase(),
  isLogicBroken: [] == ![]
};

export const evaluateCandidate = (panicLevel: number): string => {
  if (panicLevel > 9000) {
    return 'Go practice in Tandem Arena!';
  }
  return 'You are hired!';
};
`;
