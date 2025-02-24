//create a function to extract the current path from a string
export const extractPath = (str: string): string => {
  const url = new URL(str);
  return url.pathname;
};

//create a function to generate a certain offset of range 0 to a given parameter
export const getRandomOffset = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const convertFromSnakeToCapitalCase = (input: string): string => {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const convertTOSnakeCase = (input: string): string => {
  return input
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("_");
};
