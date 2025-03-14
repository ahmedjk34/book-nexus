import axios from "axios";
import { getRandomOffset } from "./util";
import { Edition } from "./Types";
import { getMostPopularEdition } from "./APIUtil";

const BASE_URL = "https://openlibrary.org";

// OpenLibrary API
export async function getPopularBooks(): Promise<any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/search.json?q=popular&limit=4&offset=${getRandomOffset(100)}`
    );
    console.log(response.data.docs);
    return response.data.docs.map((book: any) => ({
      key: book.key,
      title: book.title,
      cover_id: book.cover_i,
      authors: book.author_name,
    }));
  } catch (error) {
    console.error("Error fetching popular books:", error);
    throw error;
  }
}

export async function getBooksBySubject(
  subject: string
): Promise<{ title: string; cover_id?: number; authors: string[] }[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/subjects/${subject}.json?limit=4&offset=${getRandomOffset(
        50
      )}`
    );

    return response.data.works.map((book: any) => ({
      key: book.key,
      title: book.title,
      cover_id: book.cover_id,
      authors: book.authors.map((author: any) => author.name),
    }));
  } catch (error) {
    console.error(`Error fetching books by subject (${subject}):`, error);
    throw error;
  }
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
