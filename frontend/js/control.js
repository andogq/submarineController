// Globals
const submarineIp = "192.168.4.1";
const submarinePort = 8080;

// Sets the menu to say connecting and waits
function connect() {
    setMenu("Connecting");
    server.send(JSON.stringify(["connect"]));

    joystickEvent.all.push(joystickUpdate);
}

// Update joystick
function joystickUpdate(joystick) {
    // Send the joystick object to the server
    server.send(JSON.stringify(["joystickUpdate", joystick]));
}

// Connected function. Setup the control section
function connected() {
    setMenu("Connected");
    setupStream();
}

function setupStream() {
    // let canvas = document.createElement("canvas");
    // document.body.appendChild(canvas);
    // // Create h264 player
    // let uri = `ws://${submarineIp}:${submarinePort}`;
    // let wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
    // wsavc.connect(uri, () => {
    //     wsavc.playStream();
    // });
}
