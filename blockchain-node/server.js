const express = require('express');
const Blockchain = require('./blockchain');
const Block = require('./block');

const app = express();
const myBlockchain = new Blockchain();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.render('index', { blockchain: myBlockchain });
});

app.post('/addBlock', (req, res) => {
    let newData = {
        text: req.body.text,
        image: req.body.image
    };
    let newBlock = new Block(myBlockchain.chain.length, Date.now(), newData);
    myBlockchain.addBlock(newBlock);
    console.log(JSON.stringify(myBlockchain, null, 2));  // log the blockchain
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
