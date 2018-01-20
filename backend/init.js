console.log("[+] Starting backend script\n");

// Module imports
console.log("[+] Importing modules\n");

var http = require("http");
var fs = require("fs");

// Open static files
var staticFiles = {};

console.log("[+] Opening static files");

staticFiles["index"] = fs.readFileSync("../frontend/index.html");
console.log("    [+] index.html opened");

staticFiles["css"] = fs.readFileSync("../frontend/main.css");
console.log("    [+] main.css opened");

staticFiles["js"] = fs.readFileSync("../frontend/main.js");
console.log("    [+] main.js opened");

staticFiles["interfaces"] = fs.readFileSync("../frontend/interfaces.js");
console.log("    [+] interfaces.js opened");

console.log("\n");

// Function for incoming requests
function incomingRequest(request, response) {
    console.log("    [+] Request received");

    const url = request.url;
    console.log("        [+] Url: " + url);

    // Send the right file back
    switch (url) {
        case "/":
            var file = staticFiles["index"];
            break;

        case "/index.html":
            var file = staticFiles["index"];
            break;

        case "/main.css":
            var file = staticFiles["css"];
            break;

        case "/main.js":
            var file = staticFiles["js"];
            break;

        case "/interfaces.js":
            var file = staticFiles["interfaces"];
            break;

        default:
            var file = "404";
            break;
    }

    // Send the response
    console.log("        [+] Sending response");
    response.end(file);
}

// Set up webserver
console.log("[+] Setting up webserver");
var webserver = http.createServer(incomingRequest);
console.log("[+] Starting webserver\n");
webserver.listen(8000);
