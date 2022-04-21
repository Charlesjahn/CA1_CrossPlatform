const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");
const { app, BrowserWindow, Menu, ipcMain } = electron;
let todayWindow;
let createWindow;
let listWindow;
let allServices = [];
let allUsers = [];

fs.readFile("db.json", (err, jsonServices) => {
    if (!err) {
        const oldServices = JSON.parse(jsonServices);
        allServices = oldServices;
    };
});
app.on("ready", () => {
    // creating main window
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        min_width: 600,
        min_height: 650,
        title: "CA Bikes service booking"
    });
    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {
        const jsonServices = JSON.stringify(allServices);
        fs.writeFileSync("db.json", jsonServices);
        app.quit();
        todayWindow = null;
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
// creating new booking window
const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        min_width: 1000,
        min_height: 1000,
        title: "Booking New Service "
    }); createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (createWindow = null));
};
// creating new user account @Bekezhan
const createUserCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        min_width: 1000,
        min_height: 1000,
        title: "Creating New User"
    }); 
    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/user_registration.html`);
    createWindow.on("closed", () => (createWindow = null));
};

ipcMain.on("user:createNewUser", (event, newUserAccountForm) => {
    newUserAccountForm["id"] = uuid();
    newUserAccountForm["done"] = 0;
    allUsers.push(newUserAccountForm);
    createWindow.close();
});

ipcMain.on("user:request:listOfAllUsers", event => {
    listWindow.webContents.send("user:response:listOfAllUsers", allUsers);
});

fs.readFile("./users_db.json", (err, jsonAllUsers) => {
    if (!err) {
        const oldUsers = JSON.parse(jsonAllUsers);
        jsonAllUsers = oldUsers;
    }
});
const jsonAllUsers = JSON.stringify(allUsers);
fs.writeFileSync("./users_db.json", jsonAllUsers);



// creating all Services window

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        min_width: 700,
        min_height: 700,
        title: "All Services"
    });
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null));
};
ipcMain.on("servicesBikes:create", (event, servicesBikes) => {
    servicesBikes["id"] = uuid();
    servicesBikes["done"] = 0;
    allServices.push(servicesBikes);
    sendTodayServices();
    createWindow.close();
});
ipcMain.on("servicesBikes:request:list", event => {
    listWindow.webContents.send("servicesBikes:response:list",
        allServices);
});
ipcMain.on("servicesBikes:request:today", event => {
    sendTodayServices();
});
ipcMain.on("servicesBikes:done", (event, id) => {
    allServices.forEach(servicesBikes => {
        if (servicesBikes.id === id) servicesBikes.done = 1;
    });
    sendTodayServices();
});
const sendTodayServices = () => {
    const today = new Date().toISOString().slice(0, 10);
    const filtered = allServices.filter(
        servicesBikes => servicesBikes.dateSer === today
    );
    todayWindow.webContents.send("servicesBikes:response:today", filtered);
};
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "New Services",
                click() {
                    createWindowCreator();
                }
            },
            {
                label: "All Services",
                click() {
                    listWindowCreator();
                }
            },
            {
                label: "Create User",
                click() {
                    createUserCreator();
                }
            },
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "View",
        submenu: [{ role: "reload" }, { role: "toggledevtools" }]
    }
];