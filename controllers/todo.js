const { Todo } = require('../models')

class Todos {
    static list(req, res) {
        Todo.findAll({
            where: { UserId: req.userID }
        })
            .then(data => {
                res.status(200).json({ data: data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        console.log(req.body)
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: new Date(req.body.due_date),
            UserId: req.userID
        })
            .then(data => {
                res.status(201).json({ data })
            })
            .catch(err => {
                let error = ''
                if (err.name === 'SequelizeValidationError') {
                    for (let i = 0; i < err.errors.length - 1; i++) {
                        error += `${err.errors[i].message} & `
                    }
                    error += `${err.errors[err.errors.length - 1].message}`
                    res.status(400).json({ error })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static getTodoById(req, res) {
        let todoId = req.params.id
        Todo.findByPk(todoId)
            .then(data => {
                if (data) res.status(200).json({ data: data })
                else res.status(404).json({ message: 'data not found' })
            })
            .catch(err => {
                res.status(500).json({ err })
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
                let error = ''
                if (err.name === 'SequelizeValidationError') {
                    for (let i = 0; i < err.errors.length - 1; i++) {
                        error += `${err.errors[i].message} & `
                    }
                    error += `${err.errors[err.errors.length - 1].message}`
                    res.status(400).json({ error })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static deleteTodoById(req, res) {
        let todoId = req.params.id
        let dataDelete = null

        Todo.findByPk(todoId)
            .then(dataTodo => {
                dataDelete = dataTodo
                return Todo.destroy({
                    where: { id: todoId }
                })
            })
            .then(data => {
                if (data) res.status(200).json({ data: dataDelete })
                else res.status(404).json({ message: 'data not found' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Todos