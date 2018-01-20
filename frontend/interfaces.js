// Global variable for the parent div
let domInterface = document.getElementById("interface");

// Current item for the main menu (index 1, 0th item is heading)
let mainMenuItem = 1;
// Main menu functions. Undefined to keep it lined up with the children of the main menu
let mainMenuFunctions = [undefined,
    connectSub,
    options,
    exit
]

// Dummy functions
function connectSub() {
    console.log("Connecting");
}

function exit() {
    console.log("Exiting");
}

// Makes and returns a button
function makeButton(id, classList, innerHTML) {
    // New button
    let newButton = document.createElement("button");

    // Do the attributes
    if (id) {
        newButton.id = id;
    }

    if (innerHTML) {
        newButton.innerHTML = innerHTML;
    }

    if (classList) {
        for (newClass of classList) {
            newButton.classList.add(newClass);
        }
    }

    return newButton;
}

// Makes and returns a heading
function makeHeading(size, id, classList, innerHTML) {
    // New button
    let newHeading = document.createElement("h" + size);

    // Do the attributes
    if (id) {
        newHeading.id = id;
    }

    if (innerHTML) {
        newHeading.innerHTML = innerHTML;
    }

    if (classList) {
        for (newClass of classList) {
            newHeading.classList.add(newClass);
        }
    }

    return newHeading;
}

// Called when the options button is pressed
function options() {
    // Hide the main menu
    domInterface.removeChild(domInterface.children[0]);

    // Container for the options menu
    let domOptionsMenu = document.createElement("div");
    domOptionsMenu.id = "mainMenu"

    // Heading
    let domMainMenuHeading = makeHeading(1, undefined, ["menuHeading"], "Options");
    domOptionsMenu.appendChild(domMainMenuHeading);

    // Make 3 buttons
    let button1 = makeButton(undefined, ["buttonSelected"], "Button 1");
    domOptionsMenu.appendChild(button1);

    let button2 = makeButton(undefined, undefined, "Button 2");
    domOptionsMenu.appendChild(button2);

    let button3 = makeButton(undefined, undefined, "Button 3");
    domOptionsMenu.appendChild(button3);

    domInterface.appendChild(domOptionsMenu);

    // Set the joystick to navigate the menu
    setJoystickMainMenu();
}

// Catches the joystick moving on the main menu
function mainMenuNavigate(joystick) {
    if (buttonNotHeld("axesMiniUpDown")) { // Prevent spamming
        let domMainMenuChildren = document.getElementById("mainMenu").children;
        let mainMenuLength = domMainMenuChildren.length - 1;

        if (joystick.axes[5] > 0) {
            // Move menu selection down one
            domMainMenuChildren[mainMenuItem].classList.remove("buttonSelected");
            // Make sure it doesn't go past the last element
            mainMenuItem = mainMenuItem < mainMenuLength ? mainMenuItem + 1 : mainMenuLength;
            domMainMenuChildren[mainMenuItem].classList.add("buttonSelected");
        } else if (joystick.axes[5] < 0) {
            // Move menu selection up one
            domMainMenuChildren[mainMenuItem].classList.remove("buttonSelected");
            // Make sure it doesn't go past the last element
            mainMenuItem = mainMenuItem > 1 ? mainMenuItem - 1 : 1;
            domMainMenuChildren[mainMenuItem].classList.add("buttonSelected");
        }
    }
}

// Runs the function attached to the current menu item
function mainMenuSelect() {
    if (buttonNotHeld("trigger")) {
        mainMenuFunctions[mainMenuItem]();
    }
}

// Sets the joystick for the main menu
function setJoystickMainMenu() {
    joystickEvent.axesMiniUpDown = mainMenuNavigate;
    joystickEvent.trigger = mainMenuSelect;
}

// Makes the main menu
function mainMenu() {
    // Container for the main menu
    let domMainMenu = document.createElement("div");
    domMainMenu.id = "mainMenu"

    // Heading
    let domMainMenuHeading = makeHeading(1, undefined, ["menuHeading"], "Main Menu");
    domMainMenu.appendChild(domMainMenuHeading);

    // Make 3 buttons
    let connectButton = makeButton(undefined, ["buttonSelected"], "Connect");
    domMainMenu.appendChild(connectButton);

    let optionsButton = makeButton(undefined, undefined, "Options");
    domMainMenu.appendChild(optionsButton);

    let exitButton = makeButton(undefined, undefined, "Exit");
    domMainMenu.appendChild(exitButton);

    domInterface.appendChild(domMainMenu);

    // Set the joystick to navigate the menu
    setJoystickMainMenu();
}
