const express = require('express')
const app = express()
const dotenv = require('dotenv');
const dbService = require('./dbService')

dotenv.config();

app.get('/', (req, res) => res.send('Hello World!'))

dbService.getSelect()

app.listen(process.env.PORT, () => console.log(`Server has been ------- started on port ${process.env.PORT}`))