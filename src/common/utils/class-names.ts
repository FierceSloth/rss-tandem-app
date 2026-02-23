type ClassValue = string | string[] | undefined | null | false;

export function mergeClassNames(...arguments_: ClassValue[]): string[] {
  return arguments_.flat().filter((cls): cls is string => typeof cls === 'string' && cls.length > 0);
}
