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

function onRequest(req, res) {

    const filepath = path.join(__dirname, url.parse(req.url).path);

    fs.exists(
        filepath,
        (isExists) => isExists ? sendFile(filepath, res) : saySorry(res)
    );
}

http.createServer(onRequest)
    .listen(45654);
console.log('Listening on 45654');