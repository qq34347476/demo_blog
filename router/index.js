const express = require('express');
const router = express.Router();
const path = require('path');
const ctrl = require(path.join(__dirname,'../controller/index.js'))

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', ctrl.index);
router.get('/getCount',ctrl.getCount);
router.post('/getList', ctrl.getList);

module.exports = router;