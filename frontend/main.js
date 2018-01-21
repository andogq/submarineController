// Global variable of the joystick id. Can't store the actual joystick because it retains the state of the buttons
let joystickIndex;

// Default port for the webserver
let webserverPort = 8000;

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

// Holds the last time of all the buttons pressed so that there isn't multiple presses for holding down too long
let lastTimePressed = {
    "trigger": 0,
    "thumb": 0,
    "bottomLeftButton": 0,
    "bottomRightButton": 0,
    "topLeftButton": 0,
    "topRightButton": 0,
    "topLeftPadButton": 0,
    "topRightPadButton": 0,
    "middleLeftPadButton": 0,
    "middleRightPadButton": 0,
    "bottomLeftPadButton": 0,
    "bottomRightPadButton": 0,
    "axesMiniLeftRight": 0,
    "axesMiniUpDown": 0
}

// Prevents the button (mini axes included) from spamming by being held down
function buttonNotHeld(button) {
    // If they are 500 milliseconds apart
    if ((Date.now() - lastTimePressed[button]) > 500) {
        // Change to the new time
        lastTimePressed[button] = Date.now();
        return true;
    } else {
        return false;
    }
}

function mainLoop() {
    // Save the joystick state in a variable
    let joystick = navigator.getGamepads()[joystickIndex];

    // Check all the buttons on the joystick. Idividual if statements because multiple could be pressed at once
    if (joystick.buttons[0].pressed) {
        // console.log("Trigger pressed");
        joystickEvent.trigger(joystick);
    } else { // Prevents spamming
        lastTimePressed["trigger"] = 0;
    }

    if (joystick.buttons[1].pressed) {
        // console.log("Thumb button pressed");
        joystickEvent.thumb(joystick);
    } else {
        lastTimePressed["thumb"] = 0;
    }

    if (joystick.buttons[2].pressed) {
        // console.log("Bottom left button pressed");
        joystickEvent.bottomLeftButton(joystick);
    } else {
        lastTimePressed["bottomLeftButton"] = 0;
    }

    if (joystick.buttons[3].pressed) {
        // console.log("Bottom right button pressed");
        joystickEvent.bottomRightButton(joystick);
    } else {
        lastTimePressed["bottomRightButton"] = 0;
    }

    if (joystick.buttons[4].pressed) {
        // console.log("Top left button pressed");
        joystickEvent.topLeftButton(joystick);
    } else {
        lastTimePressed["topLeftButton"] = 0;
    }

    if (joystick.buttons[5].pressed) {
        // console.log("Top right button pressed");
        joystickEvent.topRightButton(joystick);
    } else {
        lastTimePressed["topRightButton"] = 0;
    }

    if (joystick.buttons[6].pressed) {
        // console.log("Button pad top left pressed");
        joystickEvent.topLeftPadButton(joystick);
    } else {
        lastTimePressed["topLeftPadButton"] = 0;
    }

    if (joystick.buttons[7].pressed) {
        // console.log("Button pad top right pressed");
        joystickEvent.topRightPadButton(joystick);
    } else {
        lastTimePressed["topRightPadButton"] = 0;
    }

    if (joystick.buttons[8].pressed) {
        // console.log("Button pad middle left pressed");
        joystickEvent.middleLeftPadButton(joystick);
    } else {
        lastTimePressed["middleLeftPadButton"] = 0;
    }

    if (joystick.buttons[9].pressed) {
        // console.log("Button pad middle right pressed");
        joystickEvent.middleRightPadButton(joystick);
    } else {
        lastTimePressed["middleRightPadButton"] = 0;
    }

    if (joystick.buttons[10].pressed) {
        // console.log("Button pad bottom left pressed");
        joystickEvent.bottomLeftPadButton(joystick);
    } else {
        lastTimePressed["bottomLeftPadButton"] = 0;
    }

    if (joystick.buttons[11].pressed) {
        // console.log("Button pad bottom right pressed");
        joystickEvent.bottomRightPadButton(joystick);
    } else {
        lastTimePressed["bottomRightPadButton"] = 0;
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
    } else {
        lastTimePressed["axesMiniLeftRight"] = 0;
    }

    if (joystick.axes[5] != 0) {
        joystickEvent.axesMiniUpDown(joystick);
        // console.log("Mini up down axes: " + joystick.axes[5]);
    } else {
        lastTimePressed["axesMiniUpDown"] = 0;
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

// Send message to server to suhutdown
function shutdown() {
    server.send("shutdown")
}

// Set up the websocket connection
let server = new WebSocket("ws://0.0.0.0:" + webserverPort);

server.onopen = function(event) {
    console.log("Websocket connected");
}

server.onmessage = function(event) {
    console.log("Message from server");
}

mainMenu();
