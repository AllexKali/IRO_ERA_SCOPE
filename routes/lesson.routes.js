//=================ИМПОРТ=================
const {
    Router
} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const dbAuth = require('../models/authQuery');
const dbService = require('../models/lessonQuery');
//=================ИМПОРТ=================

function toRuleList(data) {
    let rulesList = [];
    for (const RowDataPacket in data) {
        rulesList.push(data[RowDataPacket].rule);
    };
    return rulesList;
}


// ADD /lesson/create
router.post('/create',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createLessons')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const {
                        idModule,
                        idGrade = null,
                        name,
                        hours = null
                    } = req.body;

                    if (!idModule || !name) {
                        return res.status(400).json({
                            message: 'Ошибка клиента. Заполните данные!'
                        })
                    }


                    const db = dbService.getDbServiceInstance();
                    const result = db.createLesson(idModule, idGrade, name, hours)
                        .then(async (data) => {
                            if (!data) {
                                return res.status(500).json({
                                    message: "Ошибка сервера. Обратитесь за помощью"
                                })
                            }

                            return res.status(201).json({
                                message: "Урок успешно создан"
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

// UPDATE /lesson/update
router.patch('/update',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('editLessons')) {
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
                    const result = db.updateLesson(whichData, newData, id)
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

// DELETE /lesson/delete/:id
router.delete('/delete/:id',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createLessons')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const db = dbService.getDbServiceInstance();
                    const result = db.delLesson(req.params.id)
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

// SEARCH /lesson/search/:name
router.get('/search/:name',
    auth,
    async (req, res) => {
        try {
            const db = dbService.getDbServiceInstance();
            const result = db.getLessonByName(req.params.name);
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

// READ /lesson/
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