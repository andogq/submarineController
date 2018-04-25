// Sets the menu to say connecting and waits
function connect() {
    setMenu("Connecting");
    server.send("connect");
}

// Connected function. Setup the control section
function connected() {
    console.log("Here")
    setupControl();
}

function setupControl() {
    domInterface.innerHTML = "Connected";
}
