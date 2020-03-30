const { Router } = require("express");
const router = Router();
const controller = require('../controllers')
const todo = require('./todo')

router.get('/', controller.index)
router.use('/todos', todo)


module.exports = router