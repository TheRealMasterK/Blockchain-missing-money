const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Blockchain = require('./blockchain');
const Block = require('./block');

const app = express();
const upload = multer({ dest: 'blockchain-node/uploads/' });
const myBlockchain = new Blockchain();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'blockchain-node/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { blockchain: myBlockchain });
});

app.post('/addBlock', upload.single('document'), (req, res) => {
    let fileData = fs.readFileSync(req.file.path);
    let documentBase64 = new Buffer.from(fileData).toString('base64');

    let newData = {
        text: req.body.text,
        document: documentBase64
    };

    let newBlock = new Block(myBlockchain.chain.length, Date.now(), newData);
    myBlockchain.addBlock(newBlock);
    console.log(JSON.stringify(myBlockchain, null, 2));
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
