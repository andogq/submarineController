// Global variable for the parent div
let domInterface = document.getElementById("interface");

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

function mainMenu() {
    // Container for the main menu
    let domMainMenu = document.createElement("div");
    domMainMenu.id = "mainMenu"

    // Heading
    let domMainMenuHeading = document.createElement("h1");
    domMainMenuHeading.innerHTML = "Main Menu";
    domMainMenuHeading.id = "mainMenuHeading";
    domMainMenu.appendChild(domMainMenuHeading);

    let newButton = makeButton(undefined, ["buttonSelected"], "Button #1");
    domMainMenu.appendChild(newButton);

    let newButton2 = makeButton(undefined, undefined, "Button #2");
    domMainMenu.appendChild(newButton2);

    let newButton3 = makeButton(undefined, undefined, "Button #3");
    domMainMenu.appendChild(newButton3);

    domInterface.appendChild(domMainMenu);
}
