const ipc = require('electron').ipcRenderer; // the module provides methods to send synchronous and asynchronous messages from the web page to the main process

const printPDFButton = document.getElementById('print-pdf');

printPDFButton.addEventListener('click', event => {
    ipc.send('print-to-pdf');
});

