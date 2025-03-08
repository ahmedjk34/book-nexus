import { DetailedBook, SimpleBook } from "./Types";

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

export const isDetailedBook = (
  book: DetailedBook | SimpleBook
): book is DetailedBook => {
  return (book as DetailedBook).availability !== undefined;
};

export const processBookAuthors = (
  authors: string[] | { key: string; name: string }[] | undefined
): string => {
  if (!authors) return "Unknown";
  const authorNames = authors.map((author) =>
    typeof author === "string" ? author : author?.name ?? "Unknown"
  );
  return authorNames.slice(0).join(", ");
};

export const isEmptyFields = (...fields: string[]): boolean => {
  return fields.some((field) => field.trim().length === 0);
};

export const isNumericalValue = (value: any): boolean => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};
