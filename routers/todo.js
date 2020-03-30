const { Router } = require("express");
const router = Router();
const todoController = require('../controllers/todo')

router.get('/', todoController.list);
router.post('/', todoController.create);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.editTodoById);
router.delete('/:id', todoController.deleteTodoById)

module.exports = router;