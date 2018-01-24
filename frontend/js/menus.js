// The main menu
function mainMenu() {
    setMenu("WaterPi Controller",
        {label: "Connect", callback: connectSub},
        {label: "Options", callback: options},
        {label: "Shutdown", callback: shutdownConfirm}
    );
}

// Top level menus
function connectSub() {
    console.log("Connecting");
}

function options() {
    setMenu("Options",
        {label: "Connection Details", callback: connectionDetails},
        {label: "Update", callback: update},
        {label: "Back", callback: mainMenu}
    );
}

function shutdownConfirm() {
    currentMenu = "shutdownConfirm";
    setMenu("Confirm Shutdown?",
        {label: "No", callback: mainMenu},
        {label: "Yes", callback: shutdown}
    );
}

// Options menu
function connectionDetails() {
    setMenu("Connection Details",
        {label: "WiFi Network", callback: wifiNetwork},
        {label: "Submarine Network", callback: submarineNetwork},
        {label: "Back", callback: options}
    );
}

// Connection details menu
function wifiNetwork() {
    setMenu("Loading WiFi Network Details",
        {label: "Back", callback: connectionDetails}
    );
    // Get the name of the current network
    server.send("getWiFiNetwork");
}

function wifiNetworkCallback(ssid) {
    setMenu("WiFi Network Details",
        {label: "SSID: " + ssid, callback: noClick},
        {label: "Back", callback: connectionDetails}
    );
}

function submarineNetwork() {
    console.log("Submarine network");
}
