console.log("[+] Starting backend script\n");

// Module imports
console.log("[+] Importing modules\n");

var http = require("http");
var fs = require("fs");

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

    const url = request.url;
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
        console.log("        [+] Sending response");
        response.write(file);
    } else if (status == 404) {
        console.log("        [!] File not found at " + url);
    }

    // Send the response
    response.end();
}

// Set up webserver
console.log("[+] Setting up webserver");
var webserver = http.createServer(incomingRequest);
console.log("[+] Starting webserver\n");
webserver.listen(8000);
