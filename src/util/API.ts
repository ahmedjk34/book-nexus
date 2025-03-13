import axios from "axios";
import { getRandomOffset } from "./util";
import { Edition } from "./Types";

const BASE_URL = "https://openlibrary.org";

// OpenLibrary API
export async function getPopularBooks(): Promise<any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/search.json?q=popular&limit=4&offset=${getRandomOffset(100)}`
    );
    return response.data.docs;
  } catch (error) {
    console.error("Error fetching popular books:", error);
    throw error;
  }
}

export async function getBooksBySubject(subject: string): Promise<any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/subjects/${subject}.json?limit=4&offset=${getRandomOffset(
        50
      )}`
    );
    return response.data.works;
  } catch (error) {
    console.error(`Error fetching books by subject (${subject}):`, error);
    throw error;
  }
}

// Overload signatures
export function getMostPopularEdition(workId: string): Promise<Edition | null>;
export function getMostPopularEdition(editionsData: Edition[]): Edition | null;

// Function to get the most popular edition based on workId
export async function getMostPopularEdition(
  workId: string | Edition[]
): Promise<Edition | null> {
  if (typeof workId === "string") {
    // If it's a workId (string), fetch editions data
    try {
      const editionsResponse = await axios.get(
        `${BASE_URL}/works/${workId}/editions.json`
      );
      const editionsData: Edition[] = editionsResponse.data.entries || [];
      return getMostPopularEditionFromArray(editionsData); // Use the helper to find the most popular edition
    } catch (error) {
      console.error("Error fetching editions:", error);
      throw error;
    }
  } else {
    // If it's an array of Edition objects, process them directly
    return getMostPopularEditionFromArray(workId);
  }
}

// Function to get the most popular edition from an array of editions
function getMostPopularEditionFromArray(
  editionsData: Edition[]
): Edition | null {
  let mostPopularEdition: Edition | null = null;

  for (const edition of editionsData) {
    if (!edition.pagination) continue; // Skip editions without pages

    const editionYear = parseInt(edition.publish_date) || 0;
    const currentBestYear = mostPopularEdition
      ? parseInt(mostPopularEdition.publish_date) || 0
      : 0;

    // Update if this edition is more recent
    if (!mostPopularEdition || editionYear > currentBestYear) {
      mostPopularEdition = edition;
    }
  }

  return mostPopularEdition;
}

export async function getFullBookInfo(workId: string, editionId: string) {
  try {
    // Fetch work, editions, and ratings in parallel
    const [workResponse, editionsResponse, ratingsResponse] = await Promise.all(
      [
        axios.get(`${BASE_URL}/works/${workId}.json`),
        axios.get(`${BASE_URL}/works/${workId}/editions.json`),
        axios.get(`${BASE_URL}/works/${workId}/ratings.json`),
      ]
    );

    const workData = workResponse.data;
    const editionsData: Edition[] = editionsResponse.data.entries || [];
    const ratingsData = ratingsResponse.data;

    // Validate the provided editionId FIRST
    const validEdition = editionsData.find(
      (edition) => edition.key.split("/")[2] === editionId
    );

    // Only fetch the most popular edition if the provided one is invalid
    const selectedEdition = validEdition || getMostPopularEdition(editionsData);

    // Fetch author details in parallel, but only if needed
    const authorKey = workData?.authors?.[0]?.author?.key;
    const authorResponse = authorKey
      ? await axios.get(`${BASE_URL}${authorKey}.json`)
      : null;
    const authorData = authorResponse?.data || null;

    return {
      title: workData.title,
      author: authorData?.name || "Unknown Author",
      authorDetails: authorData,
      description:
        workData?.description?.value ||
        workData?.description ||
        "No description available",
      genres: workData?.subjects || [],
      editions: selectedEdition || [],
    };
  } catch (error) {
    console.error(`Error fetching book by work ID (${workId}):`, error);
    throw error;
  }
}

// Random-book-quote API
export async function getQuoteOfTheDay(): Promise<any> {
  try {
    const response = await axios.get(
      "https://random-book-quote-api.ahmedtaher212005.workers.dev/quote/today"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching random book quote:", error);
    throw error;
  }
}
