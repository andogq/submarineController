// Global variable of the joystick id. Can't store the actual joystick because it retains the state of the buttons
let joystickIndex;

// Holds reference to functions that need to be run for each particular move
let joystickEvent = {
    "trigger": function() {return;},
    "thumb": function() {return;},
    "bottomLeftButton": function() {return;},
    "bottomRightButton": function() {return;},
    "topLeftButton": function() {return;},
    "topRightButton": function() {return;},
    "topLeftPadButton": function() {return;},
    "topRightPadButton": function() {return;},
    "middleLeftPadButton": function() {return;},
    "middleRightPadButton": function() {return;},
    "bottomLeftPadButton": function() {return;},
    "bottomRightPadButton": function() {return;},
    "axesMainLeftRight": function() {return;},
    "axesMainUpDown": function() {return;},
    "axesMainTwist": function() {return;},
    "axesMiniLeftRight": function() {return;},
    "axesMiniUpDown": function() {return;}
};

function mainLoop() {
    // Save the joystick state in a variable
    let joystick = navigator.getGamepads()[joystickIndex];

    // Check all the buttons on the joystick. Idividual if statements because multiple could be pressed at once
    if (joystick.buttons[0].pressed) {
        // console.log("Trigger pressed");
        joystickEvent.trigger(joystick);
    }

    if (joystick.buttons[1].pressed) {
        // console.log("Thumb button pressed");
        joystickEvent.thumb(joystick);
    }

    if (joystick.buttons[2].pressed) {
        // console.log("Bottom left button pressed");
        joystickEvent.bottomLeftButton(joystick);
    }

    if (joystick.buttons[3].pressed) {
        // console.log("Bottom right button pressed");
        joystickEvent.bottomRightButton(joystick);
    }

    if (joystick.buttons[4].pressed) {
        // console.log("Top left button pressed");
        joystickEvent.topLeftButton(joystick);
    }

    if (joystick.buttons[5].pressed) {
        // console.log("Top right button pressed");
        joystickEvent.topRightButton(joystick);
    }

    if (joystick.buttons[6].pressed) {
        // console.log("Button pad top left pressed");
        joystickEvent.topLeftPadButton(joystick);
    }

    if (joystick.buttons[7].pressed) {
        // console.log("Button pad top right pressed");
        joystickEvent.topRightPadButton(joystick);
    }

    if (joystick.buttons[8].pressed) {
        // console.log("Button pad middle left pressed");
        joystickEvent.middleLeftPadButton(joystick);
    }

    if (joystick.buttons[9].pressed) {
        // console.log("Button pad middle right pressed");
        joystickEvent.middleRightPadButton(joystick);
    }

    if (joystick.buttons[10].pressed) {
        // console.log("Button pad bottom left pressed");
        joystickEvent.bottomLeftPadButton(joystick);
    }

    if (joystick.buttons[11].pressed) {
        // console.log("Button pad bottom right pressed");
        joystickEvent.bottomRightPadButton(joystick);
    }

    // Check the axes
    if (joystick.axes[0] != 0) {
        joystickEvent.axesMainLeftRight(joystick);
        //console.log("Main left right axes: " + joystick.axes[0]);
    }

    if (joystick.axes[1] != 0) {
        joystickEvent.axesMainUpDown(joystick);
        //console.log("Main up down axes: " + joystick.axes[1]);
    }

    if (joystick.axes[2] != 0) {
        joystickEvent.axesMainTwist(joystick);
        //console.log("Main twist axes: " + joystick.axes[2]);
    }

    // Not the 3rd axes because it has been removed from the joystick

    if (joystick.axes[4] != 0) {
        joystickEvent.axesMiniLeftRight(joystick);
        //console.log("Mini left right axes: " + joystick.axes[4]);
    }

    if (joystick.axes[5] != 0) {
        joystickEvent.axesMiniUpDown(joystick);
        // console.log("Mini up down axes: " + joystick.axes[5]);
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

mainMenu();
