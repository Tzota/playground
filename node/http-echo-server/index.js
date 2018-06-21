const http = require('http'),
    path = require('path'),
    url = require('url'),
    fs = require('fs');

function sendFile(filepath, res) {
    const stat = fs.statSync(filepath);

    res.writeHead(
        200,
        {
            "Content-Type": "text/plain",
            "Content-Length": stat.size
        }
    );

    fs.createReadStream(filepath).pipe(res);
}

function saySorry(res) {
    res.writeHead(
        200,
        {
            "Content-Type": "text/plain"
        }
    );
    res.write("Sowwy");
    res.end();
}

const echo = (req, res) => req.pipe(res);

const writeEcho = (req, res) => {
    const filename = path.join('output', String(new Date().getTime()));
    req.pipe(fs.createWriteStream(filename));
};

function onRequest(req, res) {
    // echo(req, res);
    writeEcho(req, res);
    res.writeHead(
        200,
        {
            "Content-Type": "text/plain"
        }
    );
    res.write("OK");
    res.end();
}

http.createServer(onRequest)
    .listen(45654);
console.log('Listening on 45654');
