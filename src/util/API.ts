import axios from "axios";
import { getRandomOffset } from "./util";

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
