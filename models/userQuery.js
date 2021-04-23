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

    async findIn(login) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM account WHERE login=?;";
                conn.query(query, [login], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({...results});
                })
            });
            
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async createAccount(login, password) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO account (login, password) VALUES (?,?);";
                conn.query(query, [login, password], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({...results});
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;