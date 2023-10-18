const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Blockchain = require('../../blockchain');
const Block = require('../../block');

const app = express();
const upload = multer({ dest: 'uploads/' });
const myBlockchain = new Blockchain();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.render('index', { blockchain: myBlockchain });
});

app.post('/addBlock', upload.single('document'), (req, res) => {
    console.log(req.file);  // Log the file info to see if the file was uploaded correctly

    if (!req.file) {
        console.error('No file uploaded');
        return res.redirect('/');
    }

    let fileData;
    try {
        fileData = fs.readFileSync(req.file.path);
    } catch (err) {
        console.error('Error reading file:', err);
        return res.redirect('/');
    }

    let documentBase64;
    try {
        documentBase64 = new Buffer.from(fileData).toString('base64');
    } catch (err) {
        console.error('Error encoding file to Base64:', err);
        return res.redirect('/');
    }

    let newData = {
        text: req.body.text,
        document: documentBase64
    };

    let newBlock = new Block(myBlockchain.chain.length, Date.now(), newData);
    myBlockchain.addBlock(newBlock);
    console.log(JSON.stringify(myBlockchain, null, 2));
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
