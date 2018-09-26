// Imports
const fs = require("fs");
const http = require("http");
const globals = require("./globals.js");

// Globals
let fileList = fs.readdirSync("frontend");
fileList = fileList.concat(fs.readdirSync("frontend/js"));

function initServer() {
    console.log("[+] Starting webserver");
    let server = http.createServer((req, res) => {
        console.log("[+] New request");

        let url = req.url.substring(1) == "" ? "index.html" : req.url.substring(1);

        let splitUrl = url.split("/");

        if (fileList.indexOf(splitUrl[splitUrl.length-1]) != -1) {
            fs.readFile(`frontend/${url}`, (err, data) => {
                res.statusCode = 200;

                let contentType = url.match(/\.(.+)/)[1];
                res.setHeader("Content-Type", "text/" + contentType);

                res.end(data);
            });
        } else {
            res.statusCode = 404;
            res.end();
        }
    }).listen(8000);

    return server;
}

// Exports
module.exports.initServer = initServer;
