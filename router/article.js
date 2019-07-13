const path = require('path');
const express = require('express');
const router = express.Router();
const articleCtrl = require(path.join(__dirname,'../controller/articleCtrl.js'));

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/article/add', articleCtrl.addArticleApi);
router.post('/articleAddApi', articleCtrl.articleAddApi);
router.get('/article/info/:id',articleCtrl.articleInfoApi);
router.get('/article/edit/:id',articleCtrl.editApi);
router.post('/article/changeArticleApi/:acticleId',articleCtrl.changeArticleApi);


module.exports = router;