//=================ИМПОРТ=================
const mysql = require('mysql');
const connData = require('./config/default')
//=================ИМПОРТ=================

const connection = mysql.createConnection(connData)
connection.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('Database has been', connection.state);
    }
})

module.exports = connection;