import axios from "axios";
import { Edition } from "./Types";
const BASE_URL = "https://openlibrary.org";

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
