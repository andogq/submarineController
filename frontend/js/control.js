// Globals
const submarineIp = "192.168.1.185";
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
    let iframe = document.createElement("iframe");
    iframe.src = `http://${submarineIp}:${submarinePort}/`;
    domInterface.appendChild(iframe);
}
