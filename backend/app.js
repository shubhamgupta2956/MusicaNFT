const express = require('express');
const path = require('path');
const app = express()
var SoxCommand = require('sox-audio');
var db = require('./db');
const multer = require('multer');
const port = process.env.PORT || 3000
app.use(express.json());

const audioStorage = multer.diskStorage({
    // Destination to store audio     
    destination: 'tracks', 
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const audioUpload = multer({
    storage: audioStorage,
    limits: {
      fileSize: 100000000 // 1000000 Bytes = 1 MB
    },
    //fileFilter(req, file, cb) {
    //   if (!file.originalname.match(/\.(png|jpg)$/)) { 
    //      // upload only png and jpg format
    //      return cb(new Error('Please upload a audio'))
    //    }
    //cb(undefined, true)
  //}
}) 

// For Single audio upload
app.post('/uploadAudio', audioUpload.single('audio'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.post('/addAudio', function (req, res) {
    console.log(req.body);
    db.filenameNFT.push({fileName : req.body.fileName, NFT : req.body.NFT});
    console.log(db);
    res.send(200)
})

app.post('/mergeAudio', function (req, res) {
    var command = SoxCommand();
    console.log('running')
    req.body.tracks.forEach(audio => {
        command = command.input('./tracks/'+audio);
    });
    console.log('running')
    command = command.combine('merge');
    command = command.output('./music/'+req.body.name);
    command.on('error', function(err, stdout, stderr) {
        console.log('Cannot process audio: ' + err.message);
        console.log('Sox Command Stdout: ', stdout);
        console.log('Sox Command Stderr: ', stderr)
      });
    command.run();
    db.music.push(req.body.name);
    console.log(db);
    res.send(200);
})

app.get('/getDB', (req, res) => { 
    res.send(db); 
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

console.log(db)