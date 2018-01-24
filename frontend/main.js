// Default port for the webserver
let webserverPort = 8000;

// Wait for joystick to connect and save it
window.addEventListener("gamepadconnected", function(event) {
    initJoystick(event);
});

// Send message to server to suhutdown
function shutdown() {
    server.send("shutdown");
    // Display a message
    setMenu("Shutting down controller");
    // Remove the joystick so the user can't do anything
    joystickIndex = undefined;
}

// Sends a message to update the controller
function update() {
    server.send("update");
    // Display a message
    setMenu("Updating software.....");
}

// Runs when the update is finished
function updateComplete(success) {
    // Alert the user it finished
    var message = success ? "Update complete" : "Failed to update";
    setMenu(message);
    // Wait 2 seconds before going to the previous screen
    setTimeout(function() {
        options();
    }, 1000);
}

// Set up the websocket connection
let server = new WebSocket("ws://0.0.0.0:" + webserverPort);

server.onopen = function(event) {
    console.log("Websocket connected");
}

server.onmessage = function(event) {
    console.log("Message from server");

    data = JSON.parse(event.data);

    // Call the relevant function
    switch (data[0]) {
        case "updateComplete":
            updateComplete(true);
            break;
        case "updateFailed":
            updateComplete(false);
            break;
        case "wifiNetwork":
            wifiNetworkCallback(data[1]);
            break;
        default:
            console.log("Unknown command " + event.data);
    }
}

mainMenu();
