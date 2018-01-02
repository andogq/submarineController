// Global variable of the joystick id. Can't store the actual joystick because it retains the state of the buttons
let joystickIndex;

function mainLoop() {
    // Save the joystick state in a variable
    let joystick = navigator.getGamepads()[joystickIndex];

    // Check all the buttons on the joystick. Idividual if statements because multiple could be pressed at once
    if (joystick.buttons[0].pressed) {
        console.log("Trigger pressed");
    }

    if (joystick.buttons[1].pressed) {
        console.log("Thumb button pressed");
    }

    if (joystick.buttons[2].pressed) {
        console.log("Bottom left button pressed");
    }

    if (joystick.buttons[3].pressed) {
        console.log("Button right button pressed");
    }

    if (joystick.buttons[4].pressed) {
        console.log("Top left button pressed");
    }

    if (joystick.buttons[5].pressed) {
        console.log("Top right button pressed");
    }

    if (joystick.buttons[6].pressed) {
        console.log("Button pad top left pressed");
    }

    if (joystick.buttons[7].pressed) {
        console.log("Button pad top right pressed");
    }

    if (joystick.buttons[8].pressed) {
        console.log("Button pad middle left pressed");
    }

    if (joystick.buttons[9].pressed) {
        console.log("Button pad middle right pressed");
    }

    if (joystick.buttons[10].pressed) {
        console.log("Button pad bottom left pressed");
    }

    if (joystick.buttons[11].pressed) {
        console.log("Button pad bottom right pressed");
    }

    // Check the axes
    if (joystick.axes[0] != 0) {
        console.log("Main left right axis: " + joystick.axes[0]);
    }

    if (joystick.axes[1] != 0) {
        console.log("Main up down axis: " + joystick.axes[1]);
    }

    if (joystick.axes[2] != 0) {
        console.log("Main twist axis: " + joystick.axes[2]);
    }

    // Not the 3rd axis because it has been removed from the joystick

    if (joystick.axes[4] != 0) {
        console.log("Mini left right axis: " + joystick.axes[4]);
    }

    if (joystick.axes[5] != 0) {
        console.log("Mini up down axis: " + joystick.axes[5]);
    }

    requestAnimationFrame(mainLoop);
}

// Wait for joystick to connect and save it
window.addEventListener("gamepadconnected", function(e) {
    console.log("Joystick connected");
    joystickIndex = e.gamepad.index;

    // Start the main loop
    requestAnimationFrame(mainLoop);
});
