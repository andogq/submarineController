// Function to check if the current computer is the developer computer
var fs = require("fs");

module.exports = function() {
    if (fs.existsSync("./.submarineDev")) {
        return true;
    } else {
        return false;
    }
}
