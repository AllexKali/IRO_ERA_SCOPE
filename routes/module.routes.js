//=================ИМПОРТ=================
const {
    Router
} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const dbAuth = require('../models/authQuery');
const dbService = require('../models/moduleQuery');
//=================ИМПОРТ=================

function toRuleList(data) {
    let rulesList = [];
    for (const RowDataPacket in data) {
        rulesList.push(data[RowDataPacket].rule);
    };
    return rulesList;
}


// ADD /module/create
router.post('/create',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createModule')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const {
                        idSubject,
                        name
                    } = req.body;

                    if (!idSubject || !name) {
                        return res.status(400).json({
                            message: 'Ошибка клиента. Заполните данные!'
                        })
                    }


                    const db = dbService.getDbServiceInstance();
                    const result = db.createModule(idSubject, name)
                        .then(async (data) => {
                            if (!data) {
                                return res.status(500).json({
                                    message: "Ошибка сервера. Обратитесь за помощью"
                                })
                            }

                            return res.status(201).json({
                                message: "Модуль успешно создан"
                            })
                        }).catch(err => {
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

// UPDATE /module/update
router.patch('/update',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('editModule')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }
                    const {
                        whichData,
                        newData,
                        id
                    } = req.body;

                    if (!whichData || !newData || !id) {
                        return res.status(400).json({
                            message: 'Ошибка клиента. Заполните данные!'
                        })
                    }

                    const db = dbService.getDbServiceInstance();
                    const result = db.updateModule(whichData, newData, id)
                        .then(async (data) => {
                            if (!data) {
                                return res.status(500).json({
                                    message: "Ошибка сервера. Обратитесь за помощью"
                                })
                            }

                            return res.status(201).json({
                                message: "Курс успешно обновлен"
                            })
                        }).catch(err => {
                            console.log(err);
                        })

                }).catch(err => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                message: "Ошибка сервера. Попробуйте еще раз"
            });
        }
    })

// DELETE /module/delete/:id
router.delete('/delete/:id',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createModule')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const db = dbService.getDbServiceInstance();
                    const result = db.delModule(req.params.id)
                        .then(async (data) => {
                            if (!data) {
                                return res.status(500).json({
                                    message: "Ошибка сервера. Обратитесь за помощью"
                                })
                            }

                            return res.status(201).json({
                                message: "Курс успешно удален"
                            })
                        }).catch(err => {
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

// SEARCH /module/search/:name
router.get('/search/:name',
    auth,
    async (req, res) => {
        try {
            const db = dbService.getDbServiceInstance();
            const result = db.getModuleByName(req.params.name);
            result
                .then(async (data) => {
                    if (!data) {
                        return res.status(500).json({
                            message: "Ошибка сервера. Обратитесь за помощью"
                        })
                    }
                    if (!Object.keys(data).length) {
                        return res.status(404).json({
                            message: "Ничего не найдено"
                        })
                    }
                    res.json(data);
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

// READ /module/
router.get('*',
    auth,
    async (req, res) => {
        try {
            const db = dbService.getDbServiceInstance();
            const result = db.getAll();
            result
                .then(async (data) => {
                    if (!data) {
                        return res.status(500).json({
                            message: "Ошибка сервера. Обратитесь за помощью"
                        })
                    }
                    res.json(data);
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