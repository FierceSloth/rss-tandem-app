export const messages = {
  titles: {
    notFound: 'Not Found',
  },
  errors: {
    urlQueryCorrupted: (url: string): string => `URL ${url} has more than 1 ?query sign`,
    pageNotFound: (page: string): string => `Page ${page} not found`,
    missingSupabaseEnv: 'Missing Supabase environment variables',
    svgNotFound: 'Could not find SVG element in the string passed',
  },
  terminal: {
    ready: 'System ready. Awaiting execution...',
    testsNotSet: 'Execution failed: Test suite is missing or undefined.',
    running: 'Compiling and running code',
    success: 'Build successful. All test cases passed.',
  },
  engine: {
    stringifyError: 'Error stringifying object:',
    unknownError: 'Unknown execution error occurred.',
    outputStart: '--- Console Output ---',
    testsStart: '--- Running Test Suite ---',
    timeout: 'TimeoutError: Code execution exceeded the maximum allowed time.',
  },
};
