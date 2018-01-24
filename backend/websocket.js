// Imports
var fs = require("fs");
var shelljs = require("shelljs");
var ws = require("ws");

var devMode = require("./devMode.js");

// Starts the server
function initServer(webserver) {
    // Make the websocket server
    console.log("[+] Starting the websocket server\n");
    let server = new ws.Server({server: webserver});

    // Event listener for when somthing connects to the server
    server.on("connection", function(newClient) {
        connection(newClient);
    });
}

// Run on every new connection
function connection(newClient) {
    console.log("    [+] Websocket connection");

    // Event listener for when there's data sent
    newClient.on("message", function(message) {
        incomingMessage(message, newClient);
    });
}

// Run on every incoming message
function incomingMessage(message, client) {
    console.log("        [+] Message received from client\n");
    switch (message) {
        case "shutdown":
            shutdown();
            break;
        case "update":
            update(client);
            break;
        case "getWiFiNetwork":
            wifiDetails(client);
            break;
        default:
            console.log("            [!] Unknown command " + message);
            break;
    }
}

/*
    Websocket commands
*/
// Command to shut down the controller
function shutdown() {
    // If not developer, shutdown the server
    if (!devMode()) {
        console.log("\n[+] Shutting down the controller");
        //shelljs.exec("sudo shutdown now");
    } else {
        console.log("\n[+] Terminating program");
        process.exit();
    }
}

// Command to update the controller
function update(websocket) {
    console.log("[+] Updating software");
    // Update goes here
    shelljs.exec("git pull", {silent: true}, function(code, stdout, stderr) {
        // Pulled successfully
        if (code == 0) {
            websocket.send(JSON.stringify(["updateComplete"]));
            console.log("[+] Update complete\n");
        } else {
            // Something went wrong
            websocket.send(JSON.stringify(["updateFailed"]));
            console.log("[!] Update failed");

            // Print out the error line by line
            for (line of stderr.split("\n")) {
                if (line != "") {
                    console.log("    [!] " + line);
                }
            }
            console.log("\n");
        }
    });
}

// Command to fetch the wifi details
function wifiDetails(websocket) {
    console.log("[+] Getting WiFi network details");
    shelljs.exec("iwgetid -r", {silent: true}, function(code, stdout) {
        websocket.send(JSON.stringify(["wifiNetwork", stdout]));
    });
}

// Export all the functions
module.exports.initServer = initServer;
module.exports.connection = connection;
