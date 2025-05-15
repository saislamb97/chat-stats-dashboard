export interface WebStat {
  websiteId: string;
  date: string; // ISO date string
  chats: number;
  missedChats: number;
}

export interface AggregatedStat {
  websiteId: string;
  chats: number;
  missedChats: number;
}
