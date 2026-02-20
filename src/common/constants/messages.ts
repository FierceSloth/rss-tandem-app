export const messages = {
  titles: {
    notFound: 'Not Found',
  },
  errors: {
    urlQueryCorrupted: (url: string): string => `URL ${url} has more than 1 ?query sign`,
    pageNotFound: (page: string): string => `Page ${page} not found`,
  },
};
