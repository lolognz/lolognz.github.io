// Utility function to get the correct base path for data files
export const getDataPath = (language, filename) => {
  const basePath = import.meta.env.BASE_URL || '/';
  const url = `${basePath}data/${language}/${filename}`;
  // cache-busting en dev y en hot reload
  return `${url}?t=${Date.now()}`;
};

// Alternative simpler approach - always use relative paths from the current location
export const getDataPathSimple = (language, filename) => {
  return `./data/${language}/${filename}?t=${Date.now()}`;
};