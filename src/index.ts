import { processStatistics } from "./processor";

async function main(): Promise<void> {
  console.log("🔄 Fetching full dataset...");
  const allStats = await processStatistics();
  console.log("\n✅ All Time Stats:\n", allStats);

  const startDate = new Date(2019, 3, 5); // April 5, 2019
  const endDate = new Date(2019, 3, 12); // April 12, 2019

  console.log("\n📆 Stats from 2019-04-05 to 2019-04-12...");
  const filteredStats = await processStatistics(startDate, endDate);
  console.log("\n✅ Filtered Stats:\n", filteredStats);
}

main().catch((err) => {
  console.error("❌ Failed to run:", err);
});
