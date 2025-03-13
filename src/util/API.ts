import axios from "axios";
import { getRandomOffset } from "./util";
import { Edition } from "./Types";

const BASE_URL = "https://openlibrary.org";

//OpenLibrary API
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

export async function getFullBookInfo(workId: string, editionId: string) {
  try {
    // Fetch work data
    const response = await axios.get(`${BASE_URL}/works/${workId}.json`);
    const workData = response.data;

    // Fetch editions data
    const editionsResponse = await axios.get(
      `${BASE_URL}/works/${workId}/editions.json`
    );
    const editionsData: Edition[] = editionsResponse.data.entries || [];

    // Sort editions by highest ratings
    const mostPopularEdition =
      editionsData
        .filter((edition) => edition.isbn_13 || edition.pagination) // Prefer editions with ISBN or page count
        .sort((a, b) => {
          // Prioritize editions with an ISBN
          if (a.isbn_13 && !b.isbn_13) return -1;
          if (!a.isbn_13 && b.isbn_13) return 1;

          // Sort by number of pages (pagination)
          const pagesA = parseInt(a.pagination) || 0;
          const pagesB = parseInt(b.pagination) || 0;
          if (pagesB !== pagesA) return pagesB - pagesA;

          // Sort by latest published edition
          const yearA = parseInt(a.publish_date) || 0;
          const yearB = parseInt(b.publish_date) || 0;
          return yearB - yearA;
        })[0] || null;

    // Validate the provided editionId
    const validEdition = editionsData.find(
      (edition) => edition.key.split("/")[2] === editionId
    );

    // Use the provided editionId if valid, otherwise fallback to the most famous edition
    const selectedEdition = validEdition || mostPopularEdition;

    // Fetch author details
    const authorKey = workData?.authors?.[0]?.author?.key;
    const authorResponse = authorKey
      ? await axios.get(`${BASE_URL}${authorKey}.json`)
      : null;
    const authorData = authorResponse?.data;

    // Fetch book ratings & reviews
    const ratingsResponse = await axios.get(
      `${BASE_URL}/works/${workId}/ratings.json`
    );
    const ratingsData = ratingsResponse.data;

    return {
      title: workData.title,
      author: authorData?.name || "Unknown Author",
      authorDetails: authorData || null,
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

//random-book-quote API
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
