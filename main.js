// Global variable of the joystick
let joystick;

// Wait for joystick to connect and save it
window.addEventListener("gamepadconnected", function(e) {
    console.log("Joystick connected");
    joystick = e.gamepad;
});
