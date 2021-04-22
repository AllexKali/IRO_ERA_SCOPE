const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

let instance = null;


const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

conn.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('Database connection ------- successful');
        console.log('db: ', conn.state);
    }
})

class DbService {
    //     static getDbServiceInstanse(){
    // return instance ? instance : new DbService();
    //     }
    static getSelect(){
    let query = "SELECT * FROM `role`;";

    conn.query(query, (err, result, field) => {
        // console.log(err);
        // console.log(result);
        // console.log(field);
    })
}
}

module.exports = DbService;




// conn.end(err=>{
//     if (err){
//         console.log(err);
//         return err;
// }
//     else{
//         console.log(' DB is OK');
//     }
// })

// module.exports = DbService;