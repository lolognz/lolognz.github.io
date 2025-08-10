// Utility function to get the correct base path for data files
export const getDataPath = (language, filename) => {
  const isDevelopment = import.meta.env.DEV;
  const basePath = isDevelopment ? '' : import.meta.env.BASE_URL;
  const url = `${basePath}data/${language}/${filename}`;
  return isDevelopment ? `${url}?t=${Date.now()}` : url;
};

// Alternative simpler approach - always use relative paths from the current location
export const getDataPathSimple = (language, filename) => {
  return `./data/${language}/${filename}`;
};