const {
    Router
} = require('express');
const router = Router();
const dbService = require('../models/accountQuery');

// _________readAccount__________

// READ /api/account/
router.get('/',
    async (req, res) => {

    })

// SEARCH /api/account/search/:login
router.get('/search/:login',
async (req, res) => {

})



// _________CreateAccount__________

// CREATE /api/account/create
router.post('/create',
    async (req, res) => {

    })



// _________editAccount__________

// UPDATE /api/account/update
router.patch('/update',
async (req, res) => {

})

// DELETE /api/account/delete/:login
router.delete('/delete/:login',
async (req, res) => {

})

module.exports = router;