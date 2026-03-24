import type { ICodeArenaDto } from '../common/types/types';

export const evenOrOddMockData: ICodeArenaDto = {
  id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  title: 'Valid Palindrome',
  topic: 'STRINGS & ALGORITHMS',
  description:
    'Write a function called `isValidPalindrome` that takes a string as input and returns true if the string is a palindrome, and false otherwise.\n\nA palindrome is a word, phrase, or sequence that reads the same backward as forward.\n\nPlease note: your algorithm must ignore all non-alphanumeric characters (like spaces, commas, and punctuation) and be case-insensitive.\n\nExamples:\n- isValidPalindrome("racecar") returns `true`\n- isValidPalindrome("A man, a plan, a canal: Panama") returns `true`\n- isValidPalindrome("hello") returns `false`',
  initial_code: 'function isValidPalindrome(str) {\n  // Write your code here\n  \n}',
  tests: `
    if (typeof isValidPalindrome !== 'function') {
      throw new Error("ReferenceError: Function 'isValidPalindrome' is not defined.");
    }

    const testCases = [
      { input: "racecar", expected: true, desc: "Simple one-word palindrome" },
      { input: "hello", expected: false, desc: "Simple non-palindrome word" },
      { input: "A man, a plan, a canal: Panama", expected: true, desc: "Complex palindrome with spaces and punctuation" },
      { input: "No 'x' in Nixon", expected: true, desc: "Palindrome with single quotes" },
      { input: "   ", expected: true, desc: "Empty or spaces-only string should be considered a valid palindrome" },
      { input: "12321", expected: true, desc: "Numeric palindrome" }
    ];

    testCases.forEach((tc, index) => {
      try {
        const result = isValidPalindrome(tc.input);
        if (result !== tc.expected) {
          throw new Error(\`[Test \${index + 1} Failed] \${tc.desc}. Expected: \${tc.expected}, but got: \${result}\`);
        }
      } catch (err) {
        if (err.message.includes('Test')) {
          throw err;
        }
        throw new Error(\`[Test \${index + 1} Error] Your code threw an error on input "\${tc.input}": \${err.message}\`);
      }
    });
  `,
};
