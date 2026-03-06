export const messages = {
  titles: {
    logoTitle: 'Tandem',
    notFound: 'Not Found',
    footerBrowser: (browser: string): string => `SESSION INFO :: ${browser}`,
    footerOs: (os: string): string => `/ ${os} ::`,
    footerIpAddress: (ip: string): string => `IP ${ip}`,
    statusLoading: 'Loading...',
    statusUnavailable: 'Unavailable',
    footerSystemOperational: 'ALL SYSTEMS OPERATIONAL',
  },
  buttons: {
    about: 'About',
    logIn: 'Log in',
    signInAndRegister: 'Register',
  },
  errors: {
    urlQueryCorrupted: (url: string): string => `URL ${url} has more than 1 ?query sign`,
    pageNotFound: (page: string): string => `Page ${page} not found`,
    missingSupabaseEnv: 'Missing Supabase environment variables',
    svgNotFound: 'Could not find SVG element in the string passed',
    errorFetchingIp: (error: string): string => `Failed to fetch IP: ${error}`,
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
