const { Router } = require("express");
const router = Router();
const todoController = require('../controllers/todo');
const authentication = require('../middlewares/authentication');

router.get('/', todoController.list);
router.post('/', authentication, todoController.create);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.editTodoById);
router.delete('/:id', todoController.deleteTodoById)

module.exports = router;