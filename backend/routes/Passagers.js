const express = require('express');
const router = express.Router();
const passagersCtrl = require('../controleurs/passagers');

router.post('/inscription',passagersCtrl.signup)
router.post('/connexion',passagersCtrl.login)




module.exports = router;