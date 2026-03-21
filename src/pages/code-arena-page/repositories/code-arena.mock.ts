import type { ICodeArenaDto } from '../common/types/types';

export const evenOrOddMockData: ICodeArenaDto = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Even or Odd',
  topic: 'JS BASICS',
  description:
    'Реализуйте функцию `evenOrOdd`, которая принимает целое число в качестве аргумента и возвращает строку `"Even"` для четных чисел или `"Odd"` для нечетных.\n\n### Примеры работы\n- `evenOrOdd(2)` ➞ `"Even"`\n- `evenOrOdd(7)` ➞ `"Odd"`\n- `evenOrOdd(0)` ➞ `"Even"`\n\n### Ограничения (Edge Cases)\n- На вход всегда подается корректное целое число (Integer).\n- Алгоритм должен корректно обрабатывать отрицательные значения.',
  initial_code: 'function evenOrOdd(number) {\n  // Напишите ваше решение здесь...\n}',
  tests:
    'if (typeof evenOrOdd !== \'function\') {\n  throw new Error("ReferenceError: Функция \'evenOrOdd\' не найдена. Проверьте название функции.");\n}\n\nconst testCases = [\n  { input: 2, expected: "Even", desc: "Положительное четное число" },\n  { input: 7, expected: "Odd", desc: "Положительное нечетное число" },\n  { input: 0, expected: "Even", desc: "Ноль считается четным числом" },\n  { input: -42, expected: "Even", desc: "Отрицательное четное число" },\n  { input: -7, expected: "Odd", desc: "Отрицательное нечетное число" }\n];\n\ntestCases.forEach((tc, index) => {\n  const result = evenOrOdd(tc.input);\n  if (result !== tc.expected) {\n    throw new Error(`[Тест ${index + 1} провален] ${tc.desc} (Input: ${tc.input}). Ожидалось: "${tc.expected}", Получено: "${result}"`);\n  }\n});',
};
