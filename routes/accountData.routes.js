//=================ИМПОРТ=================
const {
    Router
} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const dbAuth = require('../models/authQuery');
const dbService = require('../models/accDataQuery');
//=================ИМПОРТ=================


function toRuleList(data) {
    let rulesList = [];
    for (const RowDataPacket in data) {
        rulesList.push(data[RowDataPacket].rule);
    };
    return rulesList;
}


// ADD /accountdata/add
router.post('/add',
    auth,
    async (req, res) => {
        try {

            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('createData')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    let {
                        userId,
                        userRole
                    } = req.user;
                    const {
                        fname,
                        mname = null,
                        lname,
                        chRole = "teacher",
                        id = ''
                    } = req.body;


                    const role = dbAuth.getRole(userRole)
                        .then(async (roledata) => {
                            if (roledata === "admin") {
                                roledata = chRole;
                                userId = id;
                            }

                            if (!userId || !roledata) {
                                return res.status(400).json({
                                    message: 'Ошибка клиента. Заполните данные!'
                                })
                            }
                            const db = dbService.getDbServiceInstance();
                            const result = db.getYourData(userId, roledata);
                            result
                                .then(async (data) => {
                                    if (Object.keys(data).length) {
                                        return res.status(400).json({
                                            message: "Вы уже заполнили о себе данные"
                                        });
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });

                            if (!fname || !lname || !roledata || !userI) {
                                return res.status(400).json({
                                    message: 'Ошибка клиента. Заполните данные!'
                                })
                            }

                            const resultCreate = db.createData(fname, mname, lname, roledata, userId);
                            resultCreate
                                .then(data => {
                                    if (!data) {
                                        return res.status(500).json({
                                            message: "Ошибка сервера. Обратитесь за помощью"
                                        })
                                    }

                                    return res.status(201).json({
                                        message: "Данные сохранены"
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

// UPDATE /accountdata/update
router.patch('/update',
    auth,
    async (req, res) => {
        try {
            const db = dbService.getDbServiceInstance();

            let {
                userId,
                userRole
            } = req.user;
            const {
                whichData,
                newData,
                chRole = "teacher",
                id
            } = req.body;



            const rulesResult = dbAuth.getAuthRules(userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    switch (whichData) {
                        case 'startDate':
                            if (!ruleList.includes('teacherEditData')) {
                                return res.status(400).json({
                                    message: "Нет доступа"
                                });
                            }
                            break;

                        case 'endDate':
                            if (!ruleList.includes('teacherEditData')) {
                                return res.status(400).json({
                                    message: "Нет доступа"
                                });
                            }
                            break;
                        case 'status':
                            if (!ruleList.includes('editAllData')) {
                                return res.status(400).json({
                                    message: "Нет доступа"
                                });
                            }
                            break;
                        case 'position':
                            if (!ruleList.includes('editAllData')) {
                                return res.status(400).json({
                                    message: "Нет доступа"
                                });
                            }
                            break;
                    }
                    const role = dbAuth.getRole(userRole)
                        .then(async (roledata) => {
                            if (roledata === "admin") {
                                roledata = chRole;
                                userId = id;
                            }
                            if (!roledata || !userId || !whichData || !newData) {
                                return res.status(400).json({
                                    message: 'Ошибка клиента. Заполните данные!'
                                })
                            }

                            const result = db.editData(roledata, userId, whichData, newData);

                            result
                                .then(async (data) => {
                                    if (!data) {
                                        return res.status(500).json({
                                            message: "Ошибка сервера. Обратитесь за помощью"
                                        })
                                    }
                                    return res.status(201).json({
                                        message: "Данные изменены"
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                });
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

// _________readAccount__________


// READ /accountdata/view
router.get('/view',
    auth,
    async (req, res) => {
        try {
            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {

                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('editAllData')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }


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

// read /accountdata/
router.get('*',
    auth,
    async (req, res) => {
        try {
            const rulesResult = dbAuth.getAuthRules(req.user.userId);
            rulesResult
                .then(async (data) => {
                    const ruleList = toRuleList(data);
                    if (!ruleList.includes('editData')) {
                        res.status(400).json({
                            message: "Нет доступа"
                        });
                    }

                    const {
                        userId,
                        userRole
                    } = req.user;
                    const role = dbAuth.getRole(userRole)
                        .then(async (roledata) => {


                            const db = dbService.getDbServiceInstance();
                            const result = db.getYourData(userId, roledata);
                            result
                                .then(async (data) => {
                                    if (!Object.keys(data).length) {
                                        return res.status(400).json({
                                            message: 'Заполните о себе данные'
                                        })
                                    }

                                    res.json(data);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
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