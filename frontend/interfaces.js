// Global variable for the parent div
let domInterface = document.getElementById("interface");

// Current item for the main menu (index 1, 0th item is heading)
let currentMenuItem = 1;

// Main menu functions. Undefined to keep it lined up with the children of the main menu
let mainMenuFunctions = [undefined,
    connectSub,
    options,
    exit
]

// Option menu functions. First item is the title so it's never selected
let optionsMenuFunctions = [undefined,
    optionsButton1,
    optionsButton2,
    optionsBack
]

// Dummy functions
function connectSub() {
    console.log("Connecting");
}

function exit() {
    console.log("Exiting");
}

function optionsButton1() {
    console.log("Options button 1");
}

function optionsButton2() {
    console.log("Options button 2");
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

// Catches the joystick moving on a menu
function menuNavigate(joystick) {
    if (buttonNotHeld("axesMiniUpDown")) { // Prevent spamming
        let domMenuChildren = document.getElementById("interface").children[0].children;
        let menuLength = domMenuChildren.length - 1;

        if (joystick.axes[5] > 0) {
            // Move menu selection down one
            domMenuChildren[currentMenuItem].classList.remove("buttonSelected");
            // Make sure it doesn't go past the last element
            currentMenuItem = currentMenuItem < menuLength ? currentMenuItem + 1 : menuLength;
            domMenuChildren[currentMenuItem].classList.add("buttonSelected");
        } else if (joystick.axes[5] < 0) {
            // Move menu selection up one
            domMenuChildren[currentMenuItem].classList.remove("buttonSelected");
            // Make sure it doesn't go past the last element
            currentMenuItem = currentMenuItem > 1 ? currentMenuItem - 1 : 1;
            domMenuChildren[currentMenuItem].classList.add("buttonSelected");
        }
    }
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
    let button1 = makeButton(undefined, ["buttonSelected"], "Connection Details");
    domOptionsMenu.appendChild(button1);

    let button2 = makeButton(undefined, undefined, "Update");
    domOptionsMenu.appendChild(button2);

    let backButton = makeButton(undefined, undefined, "Back");
    domOptionsMenu.appendChild(backButton);

    domInterface.appendChild(domOptionsMenu);

    // Set the joystick to navigate the menu
    setJoystickOptionsMenu();
}

function optionsBack() {
    // Remove the current menu
    domInterface.removeChild(domInterface.children[0]);
    mainMenu();
}

// Sets the joystick for the options menu
function setJoystickOptionsMenu() {
    // Reset the menu position to the first item (not including the heading)
    currentMenuItem = 1;
    joystickEvent.axesMiniUpDown = menuNavigate;
    joystickEvent.trigger = optionsMenuSelect;
}

// Runs the function attached to the current menu item
function optionsMenuSelect() {
    if (buttonNotHeld("trigger")) {
        optionsMenuFunctions[currentMenuItem]();
    }
}

// Runs the function attached to the current menu item
function mainMenuSelect() {
    if (buttonNotHeld("trigger")) {
        mainMenuFunctions[currentMenuItem]();
    }
}

// Sets the joystick for the main menu
function setJoystickMainMenu() {
    // Reset the menu position to the first item (not including the heading)
    currentMenuItem = 1;
    joystickEvent.axesMiniUpDown = menuNavigate;
    joystickEvent.trigger = mainMenuSelect;
}

// Makes the main menu
function mainMenu() {
    // Container for the main menu
    let domMainMenu = document.createElement("div");
    domMainMenu.id = "mainMenu"

    // Heading
    let domMainMenuHeading = makeHeading(1, undefined, ["menuHeading"], "WaterPi Controller");
    domMainMenu.appendChild(domMainMenuHeading);

    // Make 3 buttons
    let connectButton = makeButton(undefined, ["buttonSelected"], "Connect");
    domMainMenu.appendChild(connectButton);

    let optionsButton = makeButton(undefined, undefined, "Options");
    domMainMenu.appendChild(optionsButton);

    let exitButton = makeButton(undefined, undefined, "Shutdown");
    domMainMenu.appendChild(exitButton);

    domInterface.appendChild(domMainMenu);

    // Set the joystick to navigate the menu
    setJoystickMainMenu();
}
