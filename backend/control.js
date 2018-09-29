// Module imports
let globals = require("./globals.js");
let net = require("net");

let socket;

function connect() {
    socket = net.connect(globals.submarinePort, globals.submarineIp, () => {
        console.log("Connected to submarine");
        globals.client.send(JSON.stringify(["connected"]));
    });
}

function joystickUpdate(joystick) {
    console.log(socket);
}

module.exports.connect = connect;
module.exports.joystickUpdate = joystickUpdate;
