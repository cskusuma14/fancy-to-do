const { Router } = require("express");
const router = Router();
const controller = require('../controllers')
const todo = require('./todo')
const user = require('./user')

router.get('/', controller.index)
router.use('/todos', todo)
router.use('/user', user)


module.exports = router