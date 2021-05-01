//=================ИМПОРТ=================
const {
    Router
} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const dbAuth = require('../models/authQuery');
const dbService = require('../models/accountQuery');
const bcrypt = require('bcrypt');
const {
    check,
    validationResult
} = require('express-validator');
//=================ИМПОРТ=================


function toRuleList(data) {
    let rulesList = [];
    for (const RowDataPacket in data) {
        rulesList.push(data[RowDataPacket].rule);
    };
    return rulesList;
}

// _________CreateAccount__________

// CREATE /account/create
router.post('/create',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Минимальная длинна пароля - 6 символов').isLength({
            min: 6
        })
    ],
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные для регистрации'
                })
            }

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createAccount')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const {
                        login,
                        password,
                        role
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

                            const hashedPassword = await bcrypt.hash(password, 12);
                            const resultCreate = db.createAccount(login, hashedPassword, role);
                            resultCreate
                                .then(data => {
                                    if (!data) {
                                        return res.status(500).json({
                                            message: "Ошибка сервера. Обратитесь за помощью"
                                        })
                                    }

                                    res.status(201).json({
                                        message: "Регистрация пользователя прошла успешно"
                                    })
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => {
                            console.log(err);
                        });
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


// _________editAccount__________

// UPDATE /account/update
router.patch('/update',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('editAccount')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const {
                        login,
                        role
                    } = req.body;

                    const db = dbService.getDbServiceInstance();
                    const result = db.findIn(login);

                    result
                        .then(async (data) => {
                            if (!Object.keys(data).length) {
                                return res.status(400).json({
                                    message: 'Этого пользователя не существует'
                                })
                            }
                            const resultEdit = db.editRole(role, login);
                            resultEdit
                                .then(data => {
                                    if (!data) {
                                        return res.status(500).json({
                                            message: "Ошибка сервера. Обратитесь за помощью"
                                        })
                                    }

                                    res.status(200).json({
                                        message: "Изменения успешно сохранены"
                                    })
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => {
                            console.log(err);
                        });
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

// DELETE /account/delete/:login
router.delete('/delete/:login',
    auth,
    async (req, res) => {
        try {
            console.log(req.params);
            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createAccount')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }
                    const {
                        login
                    } = req.params;

                    const db = dbService.getDbServiceInstance();
                    const result = db.deleteAcc(login);

                    result
                        .then(async (data) => {
                            if (!data) {
                                return res.status(500).json({
                                    message: "Ошибка сервера. Обратитесь за помощью"
                                })
                            }

                            res.status(200).json({
                                message: "Изменения успешно сохранены"
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                message: "Ошибка сервера. Попробуйте еще раз"
            });
        }
    })


// _________readAccount__________

// SEARCH /account/search/:login
router.get('/:login',
    auth,
    async (req, res) => {
        try {
            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('readAccount')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }
                    const db = dbService.getDbServiceInstance();
                    const result = db.getByLogin(req.params.login)
                        .then(async (data) => {
                            data = Object.values(JSON.parse(JSON.stringify(data)));
                            if (!Object.keys(data).length) {
                                return res.status(400).json({
                                    message: "Пользователь не найден"
                                });
                            }
                            res.json(data);
                        })
                        .catch(err => {
                            console.log(err);
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


// READ /account/
router.get('*',
    auth,
    async (req, res) => {
        try {
            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {

                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('readAccount')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }
                    const db = dbService.getDbServiceInstance();
                    const result = db.getAll();
                    result
                        .then(async (data) => {

                            data = Object.values(JSON.parse(JSON.stringify(data)));
                            res.json(data);
                        })
                        .catch(err => {
                            console.log(err);
                        });

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