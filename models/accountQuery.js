const mysql = require('mysql');
const connData = require('../config/default')

let instance = null;


const conn = mysql.createConnection(connData)
conn.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('Database has been', conn.state);
    }
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    
}

module.exports = DbService;