// Imports
var fs = require("fs");
var http = require("http");
var globals = require("./globals.js");

// Function to open and save a file
function openFile(fileName) {
    globals.staticFiles[fileName] = fs.readFileSync("./frontend/" + fileName);
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

    // Sets the root request to the index page
    let url = request.url == "/" ? "/index.html" : request.url;

    console.log("        [+] Url: " + url);

    // Gets rid of the opening "/"
    url = url.replace(/^\//, "");

    let status = 200;
    let file;

    // Send the right file back
    try {
        file = globals.staticFiles[url];
    } catch (err) {
        // File doesn't exist
        status = 404;
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
