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
                db.query(`SELECT * FROM lesson;`, (err, results) => {
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
    async getLessonByName(name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM lesson WHERE name=?;";
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

    // создать аккуантs по названию
    async createLesson(idModule, idGrade, name, hours) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO lesson (idModule,idGrade,name,hours) VALUES (?,?,?,?);";
                db.query(query, [idModule, idGrade, name, hours], (err, results) => {
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
    async delLesson(id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "DELETE FROM lesson WHERE idLesson=?;";
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
    async updateLesson(whichData, newData, id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = `UPDATE lesson SET ${whichData} = ? WHERE idLesson = ?;`;
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