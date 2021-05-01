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
                db.query(`SELECT * FROM pupilLesson;`, (err, results) => {
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
    async getTaskByName(idLesson) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM pupilLesson WHERE idLesson=?;";
                db.query(query, [idLesson], (err, results) => {
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
    async createTask(idLesson, startDate, endDate, status) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO pupilLesson (idLesson, startDate, endDate, status) VALUES (?,?,?,?);";
                db.query(query, [idLesson, startDate, endDate, status], (err, results) => {
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
    async delTask(id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "DELETE FROM pupilLesson WHERE idPupilLesson=?;";
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
    async updateTask(whichData, newData, id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = `UPDATE pupilLesson SET ${whichData} = ? WHERE idPupilLesson = ?;`;
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