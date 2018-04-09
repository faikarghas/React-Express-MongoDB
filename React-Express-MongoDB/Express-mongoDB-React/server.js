const express       = require('express');
const app           = express();
const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://faikar127:faikar127@localhost:27017/toko';
const cors          = require('cors');
const bodyParser    = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect(url, (err, db) => {
    console.log("terhubung ke mongodb");
});

// # # # # # # create route here # # # # # #
app.get('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('karyawanexmongo');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
            res.send(docs);
        });
    });
})
app.post('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var data = { nama: req.body.nama, usia: req.body.usia };
        var collection = db.collection('karyawanexmongo');
        collection.insert(data, (err, result) => {
            console.log(result);
            res.send(result);
        });
    });
})

app.listen(3210, () => {
    console.log('Server aktif di port 3210')
});
