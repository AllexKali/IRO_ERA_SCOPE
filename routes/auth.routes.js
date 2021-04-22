const {Router} = require('express');
const dbService = require('../models/userQuery');
const bcrypt = require('bcrypt');
const router = Router();


// SIGN UP  /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const {
            login,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const db = dbService.getDbServiceInstance();
        const result = db.findIn(login);

        result
            .then(data => {
                if (data) {
                    return res.status(400).json({
                        message: 'Такой пользователь уже существует'
                    })
                }
                const resultCreate = db.createAccount(login, hashedPassword);
                resultCreate
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err)
                return
            });
        hashedPassword = ''

        res.send("~tea")
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "Server ERROR. Try again"
        });
    }
})

// LOG IN  /api/auth/login
router.post('/login', async (req, res) => {

})

module.exports = router;