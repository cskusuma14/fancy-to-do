const { Router } = require("express");
const router = Router();
const todoController = require('../controllers/todo');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

router.get('/', authentication, todoController.list);
router.post('/', authentication, todoController.create);
router.get('/:id', authentication, authorization, todoController.getTodoById);
router.put('/:id', authentication, authorization, todoController.editTodoById);
router.put('/checklist/:id', authentication, authorization, todoController.checkListTodo);
router.delete('/:id', authentication, authorization, todoController.deleteTodoById)

module.exports = router;