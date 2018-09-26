// Globals
const submarineIp = "192.168.43.127";
const submarinePort = 8080;

// Sets the menu to say connecting and waits
function connect() {
    setMenu("Connecting");
    server.send("connect");
}

// Connected function. Setup the control section
function connected() {
    setupControl();
}

function setupControl() {
    domInterface.innerHTML = "";

    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    // Create h264 player
    let uri = `ws://${submarineIp}:${submarinePort}`;
    let wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
    wsavc.connect(uri, () => {
        wsavc.playStream();
    });
}
