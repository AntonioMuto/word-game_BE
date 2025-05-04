require('dotenv').config();
const express = require('express');
const httpContext = require('express-http-context');
const assignId = require('./middlewares/requestId');
const logger = require('./logger');
const cron = require('node-cron');
const connectDB = require('./configs/db');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');  
const testRoutes = require('./routes/testRoutes');

app.use(httpContext.middleware);
app.use(assignId);
app.use(express.json());

connectDB();

//ROUTES
app.use('/auth', authRoutes);
app.use('/test', testRoutes);


app.get('/', (req, res) => {
    res.send('Benvenuto!');
});

//CRONOS
cron.schedule('0 0 */2 * *', () => {
    const cleanerScript = path.join(__dirname, 'log-cleaner.js');
    exec(`node ${cleanerScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Errore pulizia log: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
});

//START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server avviato sulla porta ${PORT}`);
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Errore interno del server');
});
