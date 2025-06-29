const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');

app.use(express.json());

app.get('/events', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const sendEvent = async () => {
    const bids = JSON.parse(await fs.readFile(path.join(__dirname, 'db.json'))).bids;
    const lastBid = bids[bids.length - 1];
    if (lastBid) {
      const product = JSON.parse(await fs.readFile(path.join(__dirname, 'db.json'))).products.find(
        (p) => p.id === lastBid.productId
      );
      res.write(`data: ${JSON.stringify({ type: 'bid', bid: lastBid, product })}\n\n`);
    }
  };

  const interval = setInterval(sendEvent, 1000);

  req.on('close', () => clearInterval(interval));
});

app.listen(3002, () => console.log('SSE server running on port 3002'));