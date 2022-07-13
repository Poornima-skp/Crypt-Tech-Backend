const express = require('express');
const userCtrl = require('../controllers/user')

const router = express.Router();

//  Post '/user'
router.post('/signin', userCtrl.signin);
router.post('/signup', userCtrl.signup);


module.exports = router;