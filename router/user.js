const express = require('express');
const path = require('path')
const controller = require(path.join(__dirname,'../controller/controller'));
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));


router.post('/testApi', controller.testApi)  //测试
router.get('/login', (req, res) => res.render('user/login.ejs',{}))
router.get('/register', (req, res) => res.render('user/register.ejs',{}))
router.post('/registerApi',controller.registerApi)
router.post('/loginApi',controller.loginApi)
router.get('/logout',controller.logoutApi)

module.exports = router;
