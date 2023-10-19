const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample blockchain data (you can replace this with your actual blockchain logic)
const blockchain = [
    { index: 1, timestamp: Date.now(), data: "Block 1" },
    { index: 2, timestamp: Date.now(), data: "Block 2" }
];

// API endpoint to fetch blockchain data
app.get('/api/blockchain', (req, res) => {
    res.json(blockchain);
});

// API endpoint to add a new block
app.post('/api/addBlock', (req, res) => {
    const newBlock = {
        index: blockchain.length + 1,
        timestamp: Date.now(),
        data: req.body.data
    };
    blockchain.push(newBlock);
    res.json(newBlock);
});

// Serve React static files
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
