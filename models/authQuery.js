const db = require('../dbService');
let instance = null;

class DbService {

    // Получить права роли
    static getAuthRules(id) {
        try {
            const res = new Promise((res, rej) => {
                db.query("SELECT idRole FROM account WHERE idAccount=?;",
                    [id],
                    (err, result) => {
                        if (err) rej(new Error(err.message));
                        result[0].idRole;

                        db.query(`SELECT rule FROM schedule.rule 
                          where schedule.rule.idRule IN 
                          (SELECT idRule FROM schedule.rule_for_role 
                          where schedule.rule_for_role.idRole=?);`,
                            [result[0].idRole],
                            (err, results) => {
                                if (err) rej(new Error(err.message));
                                res({
                                    ...results
                                })
                            })
                    })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    // Получить роль
    static getRole(id) {
        try {
            const res = new Promise((res, rej) => {
                const query = "SELECT role FROM role WHERE idRole=?;";
                db.query(query, [id], (err, results) => {
                    if (err) rej(new Error(err.message));
                    res(results[0].role);
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = DbService;