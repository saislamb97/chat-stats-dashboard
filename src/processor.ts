import axios from "axios";
import { WebStat, AggregatedStat } from "./types";
import { isInRange } from "./utils";

const DATA_URL =
  "https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json";

/**
 * Fetches and processes chat statistics from the given URL
 * Optionally filters by start and end date
 */
export async function processStatistics(
  startDate?: Date,
  endDate?: Date,
): Promise<AggregatedStat[]> {
  try {
    const { data } = await axios.get<WebStat[]>(DATA_URL);

    const resultMap = new Map<string, AggregatedStat>();

    data.forEach((entry) => {
      if (!isInRange(entry.date, startDate, endDate)) return;

      const existing = resultMap.get(entry.websiteId);
      if (existing) {
        existing.chats += entry.chats;
        existing.missedChats += entry.missedChats;
      } else {
        resultMap.set(entry.websiteId, {
          websiteId: entry.websiteId,
          chats: entry.chats,
          missedChats: entry.missedChats,
        });
      }
    });

    return Array.from(resultMap.values());
  } catch (error) {
    console.error("❌ Error processing statistics:", error);
    throw error;
  }
}
