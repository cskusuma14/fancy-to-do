const { Router } = require("express");
const router = Router();
const userController = require('../controllers/user');
const googleController = require('../controllers/google');

router.get('/', userController.list);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/google-login', googleController.login);

module.exports = router;