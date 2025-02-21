//create a function to extract the current path from a string
export const extractPath = (str: string): string => {
  const url = new URL(str);
  return url.pathname;
};
