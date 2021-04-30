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
                db.query(`SELECT * FROM subject;`, (err, results) => {
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
    async getSubjectByName(name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "SELECT * FROM subject WHERE name=?;";
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
    async createSubj(idGrade, name) {
        try {
            const res = await new Promise((res, rej) => {
                const query = "INSERT INTO subject (idGrade, name) VALUES (?,?);";
                db.query(query, [idGrade, name], (err, results) => {
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
   async delSubj(id) {
    try {
        const res = await new Promise((res, rej) => {
            const query = "DELETE FROM subject WHERE idSubject=?;";
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
    
  // удалить аккуантs по id
  async updateSubj(whichData, newData, id) {
    try {
        const res = await new Promise((res, rej) => {
            const query = `UPDATE subject SET ${whichData} = ? WHERE idSubject = ?;`;
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