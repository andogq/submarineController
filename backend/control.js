// Module imports
var io = require("socket.io-client");
var globals = require("./globals.js");

let socket;

function connect() {
    socket = io.connect(`http://${globals.submarineIp}:${globals.submarinePort}/`);
    socket.on("connect", () => {
        console.log(" [+] Connected to submarine");
        globals.client.send(JSON.stringify(["connectionSuccess"]));
    });
}

module.exports.connect = connect;
