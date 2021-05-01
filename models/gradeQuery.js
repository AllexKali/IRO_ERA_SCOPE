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
                db.query(`SELECT * FROM grade;`, (err, results) => {
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
    async getGradeByName(name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM grade WHERE name=?;";
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
    async createGrade(idGrade, name, gradeNumber) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO grade (name, gradeNumber) VALUES (?,?);";
                db.query(query, [idGrade, name, gradeNumber], (err, results) => {
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
    async delGrade(id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "DELETE FROM grade WHERE idGrade=?;";
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
    async updateGrade(whichData, newData, id) {
        try {
            const res = await new Promise((res, rej) => {
                const query = `UPDATE grade SET ${whichData} = ? WHERE idGrade = ?;`;
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