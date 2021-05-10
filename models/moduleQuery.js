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
                db.query(`select  m.idModule, m.name as module_name, s.name as subject, 
                g.name as grade_name, g.gradeNumber from schedule.module m
                LEFT JOIN schedule.subject s ON s.idSubject LIKE m.idSubject
                LEFT JOIN schedule.grade g ON g.idGrade LIKE s.idGrade;`, (err, results) => {
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

    // получить модуль по названию
    async getModuleByName(name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = `select  m.idModule, m.name as module_name, s.name as subject, 
                g.name as grade_name, g.gradeNumber from schedule.module m
                LEFT JOIN schedule.subject s ON s.idSubject LIKE m.idSubject
                LEFT JOIN schedule.grade g ON g.idGrade LIKE s.idGrade WHERE m.name=?;`;
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


    // создать модуль по названию
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

    // удалить модуль по id
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

    // обновить модуль по id
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