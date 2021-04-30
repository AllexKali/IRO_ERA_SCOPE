//=================ИМПОРТ=================
const express = require('express')
const dotenv = require('dotenv');
const app = express()
//=================ИМПОРТ=================

dotenv.config();

app.use(express.json({
    extended: true
}));

app.use('/auth', require('./routes/auth.routes'))
app.use('/account', require('./routes/account.routes'));
app.use('/accountdata', require('./routes/accountData.routes'));
app.use('/subject', require('./routes/subject.routes'));
app.use('/module', require('./routes/module.routes'));


async function start() {
    try {
        await app.listen(process.env.PORT, () => console.log(`Server has been started on port ${process.env.PORT}`));
    } catch (e) {
        console.log('Server ERROR', e.message);
        process.exit(1);
    }
}

start()