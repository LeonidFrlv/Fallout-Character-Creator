const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const Data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

app.get('/data', (req, res) => {
    res.send(Data);
});

app.listen(3333, () => console.log(`Started server at http://localhost:3333!`));
