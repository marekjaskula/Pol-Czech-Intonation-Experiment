var webSocketServer = require('ws').Server;

var http = require('http');
var fs = require('fs');
var url = require('url');

var path = require('path');
var appDir = path.dirname(require.main.filename);
var csvWriter = require('csv-write-stream');

var express = require('express');
var app = express();

app.use(express.static(appDir + '\\records\\'));


var server2 = app.listen(8080);

/*http.createServer(function (req, res) {
 var query = url.parse(req.url,true).query;
 console.log(req.url);
 var pic = req.url;

 //read the image using fs and send the image content back in the response
 fs.readFile(appDir + '\\records\\' + pic, function (err, content) {
 if (err) {
 res.writeHead(400, {'Content-type':'text/html'})
 console.log(err);
 res.end("No such image");
 } else {
 //specify the content type in the response will be an image
 res.writeHead(200,{'Content-type':'application/octet-stream','Access-Control-Allow-Origin': '*','status': 200});
 res.end(content, 'binary');
 }
 });
 }).listen(8080);*/


var webSocketServerObject = new webSocketServer({port: 8090});

var timeout = 3000;

var pins = ["L", "M", "R"];

var ReadFlagEnable = false;

var startTimeout = null;

var reactionTime = 0;

webSocketServerObject.on('connection', function(socketObject) {

    socketObject.on('message', function(message) {
        //console.log('The ' + message + ' Message Received from \n from IP ' + socketObject.upgradeReq.connection.remoteAddress);
        var parsedMessage;

        try {
            parsedMessage = JSON.parse(message);

            socketObject.send("Received " + message);

            ReadFlagEnable = parsedMessage.command === 'start';

            if(ReadFlagEnable) {
                reactionTime = Date.now();
            }

            if (parsedMessage.command === 'csv') {
                console.error(parsedMessage.payload);
                handleCSV(parsedMessage.payload);
            }

            if (parsedMessage.command === 'upload_audio') {
                uploadAudio(parsedMessage.payload.src, parsedMessage.payload.filename);
            }

            if (parsedMessage.command === 'upload_record') {
                uploadRecord(parsedMessage.payload);
            }

            if (parsedMessage.command === 'get_records') {
                getRecords().then(function(response) {
                    socketObject.send(JSON.stringify({records: response}));
                });
            }
        }
        catch (exepction) {

        }
    });

    socketObject.on('close', function(c, d) {
        console.log('Disconnect ' + c + ' -- ' + d);
    });

    handleButton();

    function handleButton() {
        //pinR = 0, pinG =1, pinB =2

        timeout = Math.floor(Math.random() * 3000);

        if(timeout < 1000) {
            timeout = 1000;
        }

        if(ReadFlagEnable) {

            socketObject.send(JSON.stringify({
                pin: pins[Math.floor(Math.random() * 3)],
                reaction: Date.now() - reactionTime
            }));

            ReadFlagEnable = false;
            clearTimeout(startTimeout);
        }

        startTimeout = setTimeout(handleButton, timeout);

    }

    function handleCSV(payload) {
        var baseFolder = appDir + '\\csv\\';
        var folder = baseFolder + decodeURIComponent(payload.nameFolder);
        var fileName = folder + '\\' + decodeURIComponent(payload.filename) + '.csv';

        if(!fs.existsSync(baseFolder)) {
            fs.mkdirSync(baseFolder);
        }

        if(!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }

        var headers = [];
        Object.keys(payload.data).forEach(function(header) {
            headers.push(decodeURIComponent(header));
        });

        var data = [];
        headers.forEach(function(header) {
            data.push(decodeURIComponent(payload.data[header]));
        });

        var writer = csvWriter({ headers: headers, separator: ';'})
        writer.pipe(fs.createWriteStream(fileName));
        writer.write(data);
        writer.end();
    }

    function uploadAudio(blob, fileName) {
        var buf = new Buffer(blob, 'base64');
        return fs.writeFileSync(fileName + ".wav", buf);

    }

    function uploadImage(blob, fileName) {
        var buf = new Buffer(blob, 'base64');

        var extension = blob.substring("data:image/".length, blob.indexOf(";base64"))
        extension = extension === 'jpeg' ? '.jpg' : "." + extension;

        return fs.writeFileSync(fileName + extension, blob, 'binary');
    }

    function uploadRecord(record) {
        var baseFolder = appDir + '\\records\\';
        var folder = baseFolder + decodeURIComponent(record.id);

        var imageFileName = folder + '\\' + decodeURIComponent(record.image.fileName);
        var audioFileName = folder + '\\' + decodeURIComponent(record.audio.fileName);

        if(!fs.existsSync(baseFolder)) {
            fs.mkdirSync(baseFolder);
        }

        if(!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }

        uploadAudio(record.audio.data, audioFileName);
        uploadImage(record.image.data, imageFileName);

        socketObject.send(JSON.stringify({upload_record: true}));
    }

    function getRecords() {
        var recordsFolder = appDir + '\\records\\';
        var records = [];

        return new Promise(function(resolve,reject) {
            var folders = fs.readdirSync(recordsFolder);
            folders.forEach(function(folder) {
                const recordFolder = recordsFolder + folder;
                var recordFiles = fs.readdirSync(recordFolder);

                var recordObj = {
                    id: folder
                }

                recordFiles.forEach(function(recordFile) {
                    if (recordFile.indexOf('.wav') > -1) {
                        //audio
                        recordObj.audio = "http://localhost:8080/" + folder + '/' + recordFile;
                    } else {
                        //image
                        recordObj.image = "http://localhost:8080/" + folder + '/' + recordFile;
                    }
                })

                records.push(recordObj);

                recordObj = {
                    id: null,
                    image: null,
                    audio: null
                };
            })

            resolve(records);
        })

    }

    function getImageBase64DataFromFile(filePath) {
        // read binary data
        var bitmap = fs.readFileSync(filePath, 'binary');
        var base64Content =  new Buffer(bitmap).toString('base64');
        var index = filePath.lastIndexOf('.');
        var extension = filePath.slice(index+1, filePath.length);
        var mimeType = '';
        if (extension) {
            mimeType = getURIPrefixForImageBase64(extension.toLowerCase());
            if (!mimeType) {
                throw new Error('Unhandled MIME type')
            }
        } else {
            throw new Error('No file extension')
        }

        // convert binary data to base64 encoded string
        return `${mimeType}${base64Content}`;
    }

    function getURIPrefixForImageBase64(extension) {
        switch (extension) {
            case 'jpeg':
            case 'jpg':
                return 'data:image/jpeg;base64,';
            case 'gif':
                return 'data:image/gif;base64,';
            case 'png':
                return 'data:image/png;base64,';
            case 'svg':
                return 'data:image/svg+xml;base64,';
            default:
                return '';
        }
    }

    function getAudioBase64DataFromFile(filePath) {
        return filePath;
    }

});

var server = http.createServer(function(req, resp) {

});

server.listen(5050);
console.log('Server started');