// Global variable for the parent div
let domInterface = document.getElementById("interface");

// Current item for the main menu (index 1, 0th item is heading)
let mainMenuItem = 1;

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

// Catches the joystick moving on the main menu
function mainMenuNavigate(joystick) {
    if (buttonHeld("axesMiniUpDown")) { // Prevent spamming
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

// Sets the joystick into navigation mode
function setMainMenuNavigate() {
    joystickEvent.axesMiniUpDown = mainMenuNavigate;
}

function mainMenu() {
    // Container for the main menu
    let domMainMenu = document.createElement("div");
    domMainMenu.id = "mainMenu"

    // Heading
    let domMainMenuHeading = makeHeading(1, "mainMenuHeading", undefined, "Main Menu");
    domMainMenu.appendChild(domMainMenuHeading);

    // Make 3 buttons
    let connectButton = makeButton(undefined, ["buttonSelected"], "Connect");
    domMainMenu.appendChild(connectButton);

    let optionsButton = makeButton(undefined, undefined, "Options");
    domMainMenu.appendChild(optionsButton);

    let exitButton = makeButton(undefined, undefined, "Exit");
    domMainMenu.appendChild(exitButton);

    domInterface.appendChild(domMainMenu);

    // Set the main joystick axes to navigate them
    setMainMenuNavigate();
}
