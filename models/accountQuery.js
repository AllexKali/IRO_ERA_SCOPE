const db = require('../dbService');
let instance = null;

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
// проверка на наличие 
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

//   получить все аккуанты
    async getAll() {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT idAccount, idRole, login FROM account";
                db.query(query, (err, results) => {
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
// получить аккаунт по логину
    async getByLogin(login) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT  idAccount, idRole, login FROM account WHERE login=?;";
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

// создать аккаунт
async createAccount(login,password,role) {
    try {
        const res = await new Promise((res, rej) => {
            const query = "INSERT INTO schedule.account (login, password, idRole) VALUES (?,?,?);";
            db.query(query, [login,password,role], (err, results) => {
                if (err) rej(new Error(err.message));
                res({
                    ...results
                });
                // console.log(results);
            })
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

// Редактирование аккаунта

async editRole(role, login) {
    try {
        const res = await new Promise((res, rej) => {
            const query = "UPDATE account SET idRole = ? WHERE login = ?;";
            db.query(query, [role,login], (err, results) => {
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

// Удаление аккаунта

async deleteAcc(login) {
    try {
        const res = await new Promise((res, rej) => {
            const query = "DELETE FROM account WHERE login=?;";
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
}

module.exports = DbService;