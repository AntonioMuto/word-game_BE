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
const crosswordsRoutes = require('./routes/crosswordsRoutes');
const anagramsRoutes = require('./routes/anagramsRoutes');
const findwordsRoutes = require('./routes/findwordsRoutes');
const sudokusRoutes = require('./routes/sudokusRoutes');
const searchwordsRoutes = require('./routes/searchwordsRoutes');
const levelsRoutes = require('./routes/levelsRoutes');
const profilesRoutes = require('./routes/profilesRoutes');

app.use(httpContext.middleware);
app.use(assignId);
app.use(express.json());

connectDB();

//ROUTES
app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/crosswords', crosswordsRoutes);
app.use('/anagrams', anagramsRoutes);
app.use('/findwords', findwordsRoutes);
app.use('/sudokus', sudokusRoutes);
app.use('/searchwords', searchwordsRoutes);
app.use('/levels', levelsRoutes);
app.use('/profile', profilesRoutes);


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
