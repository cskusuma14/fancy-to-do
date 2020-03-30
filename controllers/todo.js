const { Todo } = require('../models')

class Todos {
    static list(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json({ data: data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: new Date(req.body.due_date)
        })
            .then(data => {
                res.status(201).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getTodoById(req, res) {
        let todoId = req.params.id
        Todo.findByPk(todoId)
            .then(data => {
                res.status(200).json({ data: data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static editTodoById(req, res) {
        let todoId = req.params.id
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)
        }, {
            where: { id: todoId }
        })
            .then(data => {
                return Todo.findByPk(todoId)
            })
            .then(dataTodo => {
                if (dataTodo) res.status(200).json({ data: dataTodo })
                else res.status(404).json({ message: 'data not found' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteTodoById(req, res) {
        let todoId = req.params.id

        Todo.destroy({
            where: { id: todoId }
        })
            .then(data => {
                if (data) res.status(200).json({ data: data })
                else res.status(404).json({ message: 'data not found' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Todos