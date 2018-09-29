// Default port for the webserver
let websocketPort = 8000;

// Callback for when the websocket connects
function websocketOpen(event) {
    console.log("Websocket connected");
}

// Callback when a message is received from the server
function websocketMessage(event) {
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
        case "changeWifiSuccess":
            changeWifiSuccess();
            break;
        case "changeWifiFail":
            changeWifiFail(data[1]);
            break;
        case "connected":
            connected();
            break;
        default:
            console.log("Unknown command " + event.data);
    }
}

/*
    Websocket commands
*/
// Send message to server to suhutdown
function shutdown() {
    server.send(JSON.stringify(["shutdown"]));
    // Display a message
    setMenu("Shutting down controller");
    // Remove the joystick so the user can't do anything
    joystickIndex = undefined;
}

// Sends a message to update the controller
function update() {
    server.send(JSON.stringify(["update"]));
    // Display a message
    setMenu("Updating software.....");
}

// Runs when the update is finished
function updateComplete(success) {
    // Alert the user it finished
    var message = success ? "Update complete. Now rebooting" : "Failed to update";
    // Timeout 2.5 seconds if developer mode, but long enough that the real user won't know
    var timeout = success ? 2500 : 1000;

    setMenu(message);
    // Wait
    setTimeout(function() {
        options();
    }, timeout);
}
 // Send to the server to scan for a USB
 function changeWifi() {
     server.send(JSON.stringify(["changeWifi"]));
 }

// Function called when the wifi change fails
function changeWifiFail(reason) {
    setMenu("Error: " + reason,
        {label: "Back", callback: changeWifiNetwork}
    );
}

// Function called whem the wifi change works
function changeWifiSuccess() {
    setMenu("WiFi network successfully changed. Now rebooting");
    // Just incase developer mode is on, the menu will come back eventually
    setTimeout(function() {
        changeWifiNetwork();
    }, 2500);
}
