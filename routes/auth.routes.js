const {
    Router
} = require('express');
const router = Router();
const dbService = require('../models/regQuery');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {
    check,
    validationResult
} = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();

// SIGN UP  /auth/signup
router.post('/signup',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Минимальная длинна пароля - 6 символов').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные для регистрации'
                })
            }

            const {
                login,
                password,
                role = 2,
                code=""
            } = req.body;

            const db = dbService.getDbServiceInstance();
            const result = db.findIn(login);

            result
                .then(async (data) => {
                    if (Object.keys(data).length) {
                        return res.status(400).json({
                            message: 'Этот пользователь уже был зарегистрирован'
                        })
                    }
                    if (role===1) {
                        if (code!==process.env.CODE) {
                            return res.status(400).json({
                                message: 'Некорректные данные для регистрации1'
                            })
                        }
                    }

                    const hashedPassword = await bcrypt.hash(password, 12);
                    const resultCreate = db.createAccount(login, hashedPassword,role);
                    resultCreate
                        .then(data => {
                            if (!data) {
                                return res.status(500).json({
                                    message: "Ошибка сервера. Обратитесь за помощью"
                                })
                            }
                            return res.status(201).json({
                                message: "Регистрация пользователя прошла успешно"
                            })
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                });

        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                message: "Ошибка сервера. Попробуйте еще раз"
            });
        }
    })

// LOG IN  /auth/login
router.post('/login',
    [
        check('login', 'Некорректный логин').exists(),
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные для авторизации!'
                })
            }

            const {
                login,
                password
            } = req.body;

            const db = dbService.getDbServiceInstance();
            const result = db.findIn(login);

            result
                .then(async (data) => {

                    if (!Object.keys(data).length) {
                        return res.status(400).json({
                            message: 'Такого пользователя не существет'
                        })
                    }
                    const isMatch = await bcrypt.compare(password, data[0].password)
                    if (!isMatch) {
                        return res.status(400).json({
                            message: 'Неверный пароль'
                        })
                    }
                    if (!data) {
                        return res.status(500).json({
                            message: "Ошибка сервера. Обратитесь за помощью"
                        })
                    }
                    const token = jwt.sign({
                            userId: data[0].idAccount,
                            userRole: data[0].idRole
                        },
                        process.env.JWTSECRET, {
                            expiresIn: "12h"
                        }
                    )

                    res.json({
                        token,
                        userId: data[0].idAccount
                    })

                })
                .catch(err => {
                    console.log(err);
                });

        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                message: "Ошибка сервера. Попробуйте еще раз"
            });
        }
    })

module.exports = router;