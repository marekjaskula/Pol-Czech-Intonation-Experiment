var webSocketServer = require('ws').Server;
var http = require('http');
var fs = require('fs');

var path = require('path');
var appDir = path.dirname(require.main.filename);
var csvWriter = require('csv-write-stream')

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
        fs.writeFile(fileName + ".wav", buf, function(err) {
            if(err) {
                console.log("err", err);
            } else {
                //return res.json({'status': 'success'});
            }
        });

    }

    function uploadImage(blob, fileName) {
        var buf = new Buffer(blob, 'base64');

        var extension = blob.substring("data:image/".length, blob.indexOf(";base64"))
        extension = extension === 'jpeg' ? '.jpg' : "." + extension;

        fs.writeFile(fileName + extension, buf, function(err) {
            if(err) {
                console.log("err", err);
            } else {
                //return res.json({'status': 'success'});
            }
        })
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
    }

});

var server = http.createServer(function(req, resp) {

});

server.listen(5050);
console.log('Server started');


