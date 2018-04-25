var globals = {
    webserverPort: 8000,
    submarineIp: "192.168.1.185",
    submarinePort: 3000,
    staticFileNames: ["index.html", "main.css", "js/main.js", "js/interfaces.js", "js/joystick.js", "js/websocket.js", "js/menus.js", "js/control.js"],
    staticFiles: {}
}

// If dev mode then use localhost as ip
// if (require("./devMode.js")()) {
//     globals.submarineIp = "localhost";
// }

module.exports = globals;
