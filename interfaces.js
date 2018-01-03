// Global variable for the parent div
let domInterface = document.getElementById("interface");

function mainMenu() {
    // Container for the main menu
    let domMainMenu = document.createElement("div");
    domMainMenu.id = "mainMenu"

    // Heading
    let domMainMenuHeading = document.createElement("h1");
    domMainMenuHeading.innerHTML = "Main Menu";
    domMainMenuHeading.id = "mainMenuHeading";
    domMainMenu.appendChild(domMainMenuHeading);

    // Buttons for menu
    for (i=0; i < 3; i++) {
        let domNewButton = document.createElement("button");

        domNewButton.innerHTML = "Button #" + i;

        domMainMenu.appendChild(domNewButton);
    }

    domInterface.appendChild(domMainMenu);
}
