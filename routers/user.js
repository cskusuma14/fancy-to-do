const { Router } = require("express");
const router = Router();
const userController = require('../controllers/user')

router.get('/', userController.list);
router.post('/register', userController.register)

module.exports = router;