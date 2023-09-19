const express = require('express')
const router = express.Router()


//JSON object to be added to cookie
let users = {
    name : "Ritik",
    Age : "18"
    }

router.get('/', (req, res) => {
    const response = res.send('user data added to cookie');
    res.cookie("userData", users);
})

router.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})

module.exports = router


