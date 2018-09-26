// Wait for joystick to connect and save it
window.addEventListener("gamepadconnected", function(event) {
    initJoystick(event);
});

// Set up the websocket connection
let server = new WebSocket("ws://localhost:" + websocketPort);

server.onopen = function(event) {
    websocketOpen(event);
}

server.onmessage = function(event) {
    websocketMessage(event);
}

// Empty joystick object to emulate
const emptyJoystick = {
    axes: [
        0,
        0,
        0,
        0,
        0,
        0
    ],
    buttons: [
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        },
        {
            pressed: false
        }
    ]
}

// Event listeners for keyboard (to emulate joystick)
document.addEventListener("keydown", (e) => {
    let tmpJoystick = emptyJoystick;
    switch (e.key) {
        case "ArrowUp":
            tmpJoystick.axes[5] = -1;
            joystickEvent.axesMiniUpDown(tmpJoystick);
            break;
        case "ArrowDown":
            tmpJoystick.axes[5] = 1;
            joystickEvent.axesMiniUpDown(tmpJoystick);
            break;
        case "ArrowLeft":
            break;
        case "ArrowRight":
            break;
        case "w":
            break;
        case "s":
            break;
        case "a":
            break;
        case "d":
            break;
        case "Enter":
            joystickEvent.trigger();
            break;
        case "Escape":
            break;
        default:
            break;
    }
})

// Make the main menu
mainMenu();
