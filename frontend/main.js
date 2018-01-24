// Wait for joystick to connect and save it
window.addEventListener("gamepadconnected", function(event) {
    initJoystick(event);
});

// Set up the websocket connection
let server = new WebSocket("ws://0.0.0.0:" + websocketPort);

server.onopen = function(event) {
    websocketOpen(event);
}

server.onmessage = function(event) {
    websocketMessage(event);
}

// Make the main menu
mainMenu();
