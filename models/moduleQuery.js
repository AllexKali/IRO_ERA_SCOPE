const db = require('../dbService');
let instance = null;

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    // получить все аккуанты
    async getAll() {
        try {
            const res = await new Promise((res, rej) => {
                db.query(`SELECT * FROM module;`, (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    })
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    // получить аккуантs по названию
    async getModuleByName(name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM module WHERE name=?;";
                db.query(query, [name], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    })
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }


    // получить аккуантs по названию
    async createModule(idSubject, name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO module (idSubject, name) VALUES (?,?);";
                db.query(query, [idSubject, name], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    })
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    // удалить аккуантs по id
    async delModule(id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "DELETE FROM module WHERE idModule=?;";
                db.query(query, [id], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    })
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    // обновить аккуантs по id
    async updateModule(whichData, newData, id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = `UPDATE module SET ${whichData} = ? WHERE idModule = ?;`;
                db.query(query, [newData, id], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res({
                        ...results
                    })
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = DbService;