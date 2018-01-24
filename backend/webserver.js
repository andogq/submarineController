// Imports
var fs = require("fs");
var http = require("http");
var globals = require("./globals.js");

// Function to open and save a file
function openFile(fileName) {
    globals.staticFiles[fileName] = fs.readFileSync("../frontend/" + fileName);
    console.log("    [+] " + fileName + " opened");
}

// Loops through all the files and saves them
function openFiles() {
    // Open static files
    console.log("[+] Opening static files");
    // Loop through the list of files and open them
    for (file of globals.staticFileNames) {
        openFile(file);
    }
    console.log("\n");
}

// The starts the server
function initServer() {
    // Open all the files
    openFiles();

    // Set up webserver
    console.log("[+] Starting webserver on port " + globals.webserverPort + "\n");
    let server = http.createServer(module.exports.incomingRequest);
    server.listen(globals.webserverPort);

    // Export the server object so it can be used
    module.exports.server = server;
}

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
            file = globals.staticFiles["index.html"];
            break;

        case "/index.html":
            file = globals.staticFiles["index.html"];
            break;

        case "/main.css":
            file = globals.staticFiles["main.css"];
            break;

        case "/main.js":
            file = globals.staticFiles["main.js"];
            break;

        case "/interfaces.js":
            file = globals.staticFiles["interfaces.js"];
            break;

        case "/joystick.js":
            file = globals.staticFiles["joystick.js"];
            break;

        case "/websocket.js":
            file = globals.staticFiles["websocket.js"];
            break;

        case "/menus.js":
            file = globals.staticFiles["menus.js"];
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

// Export all the functions
module.exports.openFile = openFile;
module.exports.initServer = initServer;
module.exports.incomingRequest = incomingRequest;
