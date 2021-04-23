const express = require('express')
const dotenv = require('dotenv');
const mysql = require('mysql');
const app = express()

dotenv.config();

app.use(express.json({extended:true}));

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/account', require('./routes/account.routes'));



async function start() {
    try {
        await app.listen(process.env.PORT, () => console.log(`Server has been started on port ${process.env.PORT}`));
    } catch (e) {
        console.log('Server ERROR', e.message);
        process.exit(1);
    }
}

start()