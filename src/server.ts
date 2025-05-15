import express from 'express';
import path from 'path';
import { processStatistics } from './processor';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML/CSS/JS from /public
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to get aggregated stats with optional date filters
app.get('/api/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate as string) : undefined;
    const end = endDate ? new Date(endDate as string) : undefined;

    const stats = await processStatistics(start, end);
    res.json(stats);
  } catch (err) {
    console.error('❌ Failed to process stats:', err);
    res.status(500).json({ message: 'Failed to process statistics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
