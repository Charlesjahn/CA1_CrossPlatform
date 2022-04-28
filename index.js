//Modules
const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const url = require('url');
const { userInfo } = require("os");
//const { main } = require("json");

let todayWindow;
let createWindow;
let listWindow;
let allServices = [];
let allUsers = [];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

fs.readFile("db.json", (err, jsonServices) => {
    if (!err) {
        const oldServices = JSON.parse(jsonServices);
        allServices = oldServices;
    };
});

// Create a new BrowserWindow when `app` is ready
function createMainWindow() {

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        title: "CA Bikes service booking",
        webPreferences: {
            // --- !! IMPORTANT !! ---
            // Disable 'contextIsolation' to allow 'nodeIntegration'
            // 'contextIsolation' defaults to "true" as from Electron v12
            contextIsolation: false,
            nodeIntegration: true
        }
    })
    // Load index.html into the new BrowserWindow
    mainWindow.loadURL(`file://${__dirname}/login.html`);
    mainWindow.once('ready-to-show', function () {
        mainWindow.show();
    });

    // Open DevTools - Remove for PRODUCTION! "comment it"
    mainWindow.webContents.openDevTools();

    // Listen for window being closed
    mainWindow.on('closed', () => {
        const jsonAllUsers = JSON.stringify(allUsers);
        fs.writeFile("users_db.json", jsonAllUsers);
        app.quit();
        mainWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
};

// Electron `app` is ready
app.on('ready', createMainWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

fs.readFile("users_db.json", (err, jsonAllUsers) => {
    if (!err) {
        const oldUsers = JSON.parse(jsonAllUsers);
        allUsers = oldUsers;
    }
});

// when login was successful, it loads today.html window
ipcMain.on('login', (event, userName, userPass) => {

    let username = userName;
    let password = userPass;
    function Authorization() {

        let user = allUsers[0];
        console.log(allUsers[0]);
        if (username === user["username"]) {
            console.log("working");
            if (password === user['password']) {
                console.log("u successfully logged in : " + user["username"]);
                // mainWindow = todayWindow;
                mainWindow.loadURL(`file://${__dirname}./today.html`);
            }
            else {
                console.log("wrong password");
            }
        } else {
            console.log(user["username"]);
            console.log("not working! wrong username!")
        }
    }
    console.log("this is the user that logged in: " + userName + " password " + userPass);
    Authorization();
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
    mainWindow.webContents.send("servicesBikes:response:today", filtered);
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