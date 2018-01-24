console.log("[+] Starting backend script\n");

// Module imports
console.log("[+] Importing modules\n");

// NPM modules
var fs = require("fs");
var shelljs = require("shelljs");

// Personal modules
var globals = require("./globals.js");
var webserver = require("./webserver.js");
var websocket = require("./websocket.js");
var devMode = require("./devMode.js");

// Start the servers
webserver.initServer();
websocket.initServer(webserver.server);

// Check if running on developer machine
if (devMode()) {
    console.log("[+] Developer machine; Not launching Chromium")
} else {
    console.log("[+] Launching web browser");
    shelljs.exec("chromium-browser --app=http://0.0.0.0:" + webserverPort + " --start-fullscreen &", {silent: true});
}
