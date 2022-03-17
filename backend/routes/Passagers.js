const express = require('express');
const router = express.Router();
const passagersCtrl = require('../controleurs/passagers');
const auth = require('../middleware/auth')

router.post('/inscription',passagersCtrl.signup)
router.post('/connexion',passagersCtrl.login)
router.get('/verify-token',passagersCtrl.verify_token)




module.exports = router;