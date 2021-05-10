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
                db.query(`SELECT t.first_name, t.middle_name, t.position, m.name as unit, l.name, l.hours, g.name as grade_name, g.gradeNumber
                FROM schedule.lesson l
                LEFT JOIN schedule.teacher_has_lesson tl ON l.idLesson = tl.idLesson
                LEFT JOIN schedule.teacher t ON tl.idTeacher = t.idTeacher
                LEFT JOIN schedule.module m ON m.idModule LIKE l.idModule 
                LEFT JOIN schedule.grade g ON g.idGrade LIKE l.idGrade;`, (err, results) => {
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

    // получить урок по названию
    async getLessonByName(name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = 
               `SELECT t.first_name, t.middle_name, t.position, m.name as unit, l.name, l.hours, g.name as grade_name, g.gradeNumber
               FROM schedule.lesson l
               LEFT JOIN schedule.teacher_has_lesson tl ON l.idLesson = tl.idLesson
               LEFT JOIN schedule.teacher t ON tl.idTeacher = t.idTeacher
               LEFT JOIN schedule.module m ON m.idModule LIKE l.idModule 
			   LEFT JOIN schedule.grade g ON g.idGrade LIKE l.idGrade WHERE l.name=?;`;
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

    // создать урок по названию
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

    // удалить урок по id
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

    // обновить урок по id
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