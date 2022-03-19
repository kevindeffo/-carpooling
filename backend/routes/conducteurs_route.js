const express = require('express');
const router = express.Router();
const conducteursCtrl = require('../controleurs/conducteurs_ctrl');
const auth = require('../middleware/auth')

router.post('/inscription',conducteursCtrl.signup)
router.post('/connexion',conducteursCtrl.login)
router.get('/verify-token',conducteursCtrl.verify_token)




module.exports = router;