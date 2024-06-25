const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Create SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'runner-game.db'));

// Handle IPC events
ipcMain.on('poseData', (event, poseData) => {
    // Process pose data received from renderer process
    console.log('Received pose data:', poseData);
});

ipcMain.on('saveHighScore', (event, score) => {
    // Save high score to SQLite database
    db.serialize(() => {
        db.run(`INSERT INTO scores (score) VALUES (${score})`);
    });
});

ipcMain.on('getHighScores', (event) => {
    // Retrieve high scores from SQLite database
    db.all(`SELECT * FROM scores ORDER BY score DESC LIMIT 10`, (err, rows) => {
        if (err) {
            console.error(err);
            event.returnValue = [];
        } else {
            event.returnValue = rows;
        }
    });
});

ipcMain.on('saveSettings', (event, settings) => {
    // Save user settings to SQLite database
    db.serialize(() => {
        db.run(`INSERT INTO settings (username, difficulty) VALUES (?, ?)`, [settings.username, settings.difficulty]);
    });
});

// Create main Electron window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
