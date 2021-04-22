const dotenv = require('dotenv');
dotenv.config();


const connData = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
}

module.exports = connData;