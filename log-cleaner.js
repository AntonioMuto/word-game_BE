const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'errors.log');

fs.writeFile(logFilePath, '', 'utf8', (err) => {
    if (err) {
        console.error('Errore durante la pulizia del log:', err);
    } else {
        console.log(`[${new Date().toISOString()}] Log pulito con successo.`);
    }
});
