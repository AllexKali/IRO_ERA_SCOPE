const db = require('../dbService');
let instance = null;

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async findIn(login) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM account WHERE login=?;";
                db.query(query, [login], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    });
                })
            });

            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async createAccount(login, password, role=2) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO account (login, password, idRole) VALUES (?,?,?);";
                db.query(query, [login, password, role], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    });
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;