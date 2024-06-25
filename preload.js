const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendPoseData: (poseData) => ipcRenderer.send('poseData', poseData),
    receiveSettings: (callback) => {
        ipcRenderer.on('settings', (_, settings) => callback(settings));
    },
    saveSettings: (settings) => ipcRenderer.send('saveSettings', settings),
    saveHighScore: (score) => ipcRenderer.send('saveHighScore', score),
    getHighScores: () => ipcRenderer.sendSync('getHighScores'),
});
