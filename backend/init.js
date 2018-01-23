// Defaults
const webserverPort = 8000;

console.log("[+] Starting backend script\n");

// Module imports
console.log("[+] Importing modules\n");

var http = require("http");
var fs = require("fs");
var shelljs = require("shelljs");
var ws = require("ws");


// Open static files
console.log("[+] Opening static files");

var staticFiles = {};
const staticFileNames = ["index.html", "main.css", "main.js", "interfaces.js"];

// Function to open and save a file
function openFile(fileName) {
    staticFiles[fileName] = fs.readFileSync("../frontend/" + fileName);
    console.log("    [+] " + fileName + " opened");
}

// Loop through the list of files and open them
for (file of staticFileNames) {
    openFile(file);
}

console.log("\n");

// Function for incoming requests
function incomingRequest(request, response) {
    console.log("    [+] Request received");

    const url = request.url == "/" ? "/index.html" : request.url;
    console.log("        [+] Url: " + url);

    // Send the right file back
    var file = "";
    var status = 200;

    switch (url) {
        case "/":
            file = staticFiles["index.html"];
            break;

        case "/index.html":
            file = staticFiles["index.html"];
            break;

        case "/main.css":
            file = staticFiles["main.css"];
            break;

        case "/main.js":
            file = staticFiles["main.js"];
            break;

        case "/interfaces.js":
            file = staticFiles["interfaces.js"];
            break;

        default:
            status = 404;
            break;
    }

    // Set the status code of the response
    response.statusCode = status;

    // Check the status code
    if (status == 200) {
        // Set the content type
        var contentType = url.match(/\.(.+)/)[1];
        response.setHeader("Content-Type", "text/" + contentType);

        // Write the response
        response.write(file);
    } else if (status == 404) {
        console.log("        [!] File not found at " + url);
    }

    // Send the response
    console.log("        [+] Sending response\n");
    response.end();
}

// Set up webserver
console.log("[+] Setting up webserver");
var webserver = http.createServer(incomingRequest);
console.log("[+] Starting webserver on port " + webserverPort + "\n");
webserver.listen(webserverPort);

function shutdown() {
    // If not developer, shutdown the server
    if (!developerMode) {
        console.log("\n[+] Shutting down the controller");
        shelljs.exec("sudo shutdown now");
    } else {
        console.log("\n[+] Terminating program");
        process.exit();
    }
}

function update(websocket) {
    console.log("[+] Updating software");
    // Update goes here
    shelljs.exec("git pull", {silent: true}, function(code, stdout, stderr) {
        // Pulled successfully
        if (code == 0) {
            websocket.send("updateComplete");
            console.log("[+] Update complete\n");
        } else {
            // Something went wrong
            websocket.send("updateFailed")
            console.log("[!] Update failed");

            // Print out the error line by line
            for (line of stderr.split("\n")) {
                if (line != "") {
                    console.log("    [!] " + line);
                }
            }
            console.log("\n")
        }
    });
}

// Event listener for when something connects
function websocketServerIncommingMessage(message, websocket) {
    console.log("        [+] Message received from client\n");
    switch (message) {
        case "shutdown":
            shutdown();
            break;
        case "update":
            update(websocket);
            break;
        default:
            console.log("            [!] Unknown command " + message);
            break;
    }
}

// Function for when the client connects to the websocket server
function websocketServerConnect(websocket) {
    console.log("    [+] Websocket connection");

    // Event listener for when theres data sent
    websocket.on("message", function(message) {
        websocketServerIncommingMessage(message, websocket);
    });
}

// Start the websocket server
console.log("[+] Starting the websocket server\n");
var websocketServer = new ws.Server({server: webserver});

// Event listener for when somthing connects to the server
websocketServer.on("connection", function(ws) {
    websocketServerConnect(ws);
});

var developerMode = false;
// Check if running on developer machine
if (fs.existsSync("../.submarineDev")) {
    developerMode = true;
    console.log("[+] Developer machine; Not launching Chromium")
} else {
    console.log("[+] Launching web browser");
    shelljs.exec("chromium-browser --app=http://0.0.0.0:" + webserverPort + " --start-fullscreen &", {silent: true});
}
