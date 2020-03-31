const { User } = require('../models')

class Users {
    static list(req, res) {
        User.findAll()
            .then(data => {
                res.status(200).json({ data: data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static register(req, res) {
        User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'User'
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
                    res.status(500).json({ message: 'internal server error' })
                }
            })
    }
}

module.exports = Users