import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.get('/events', async (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const sendEvent = async () => {
    try {
      const db = JSON.parse(await readFile(path.join(__dirname, 'db.json'), 'utf-8'));
      const bids = db.bids;
      const lastBid = bids[bids.length - 1];
      if (lastBid) {
        const product = db.products.find((p) => p.id === lastBid.productId);
        res.write(`data: ${JSON.stringify({ type: 'bid', bid: lastBid, product })}\n\n`);
      }
    } catch (error) {
      console.error('Error reading db.json:', error);
    }
  };

  const interval = setInterval(sendEvent, 1000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(3002, () => console.log('SSE server running on port 3002'));