const db = require('../dbService');
let instance = null;

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    // получить все задания
    async getAll(data) {

        if (!data) {
            try {
                const res = await new Promise((res, rej) => {
                    db.query(`SELECT * FROM pupilLesson;`, (err, results) => {
                        if (err) rej(new Error(err.message));
                        obj['pupilLesson'] = {
                            ...results
                        }
                    })

                    db.query(`SELECT * FROM pupil;`, (err, results) => {
                        if (err) rej(new Error(err.message));
                        obj['pupil'] = {
                            ...results
                        };
                        res({
                            ...obj
                        })
                    })
                });
                return res;
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await new Promise((res, rej) => {
                    db.query(`select * from schedule.pupillesson where schedule.pupillesson.idPupilLesson in 
                    (select idPupilLesson from schedule.pupillesson_for_pupil  where schedule.pupillesson_for_pupil.idPupil in (
                    select idPupil from schedule.pupil  where idAccount=?))`, [data], (err, results) => {
                        if (err) rej(new Error(err.message));
                        res({
                            ...obj
                        })
                    })
                });
                return res;
            } catch (error) {
                console.log(error);
            }
        }
    }

    // получить задания по названию
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

    // создать задания по названию
    async createTask(idLesson, startDate, endDate) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO pupilLesson (idLesson, startDate, endDate) VALUES (?,?,?);";
                db.query(query, [idLesson, startDate, endDate], (err, results) => {
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

    // удалить задания по id
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

    // обновить задания по id
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

    // создать задания по названию
    async createTaskToPeople(data) {
        try {
            const res = await new Promise((res, rej) => {
                const query = `INSERT INTO pupillesson_for_pupil (idPupilLesson, idPupil) VALUES ${data};`;
                db.query(query, (err, results) => {
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