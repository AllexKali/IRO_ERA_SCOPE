const db = require('../dbService');
let instance = null;

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }


// получить все аккуанты
        async getAll() {
            let obj={}
            try {
                const res = await new Promise((res, rej) => {
                        db.query(`SELECT * FROM pupil;`, (err, results) => {
                        if (err) rej(new Error(err.message));
                        obj['pupil']={
                            ...results
                        };
                    });
                    db.query(`SELECT * FROM teacher;`, (err, results) => {
                        if (err) rej(new Error(err.message));
                        obj['teacher']={
                            ...results
                        };
                        res({...obj})
                    })
                });
                return res;
            } catch (error) {
                console.log(error);
            }
        }
// получить данные своего аккаунта
        async getYourData(id,role) {
            try {
                const res = await new Promise((res, rej) => {
                    const query = `SELECT * FROM ${role} WHERE idAccount=?;`;
                    db.query(query, [id], (err, results) => {
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
 // Редактирование данные своего аккаунта
    
 async editData(role, id, whichData, newData) {
    try {
        const res = await new Promise((res, rej) => {
            const query = `UPDATE ${role} SET ${whichData} = ? WHERE idAccount = ?;`;
            db.query(query, [newData, id], (err, results) => {
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


// Сохран данных своего аккаунта
           
 async createData(fname,mname,lname,role,id) {
                   try {
                       const res = await new Promise((res, rej) => {
                           const query = `INSERT INTO ${role} (idAccount, first_name, middle_name, last_name) values (?,?,?,?);`;
                           db.query(query, [id,fname, mname, lname], (err, results) => {
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