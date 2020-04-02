const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken');

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
        User.findAll({
            where: { email: req.body.email }
        })
            .then(dataUser => {
                if (dataUser.length === 0) {
                    return User.create({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        role: 'User'
                    })
                } else {
                    res.status(400).json({ error: 'email sudah terdaftar' })
                }
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

    static login(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(dataUser => {
                if (!dataUser) {
                    res.status(400).json({ message: 'email belum terdaftar' })
                } else {
                    const isPassword = checkPassword(req.body.password, dataUser.password)
                    console.log(isPassword)
                    if (!isPassword) {
                        res.status(400).json({ message: 'password salah' })
                    } else {
                        const accessToken = jwt.sign({
                            userId: dataUser.id,
                            username: dataUser.username,
                            email: dataUser.email,
                            role: dataUser.role
                        }, process.env.JWT_SECRET)
                        res.status(201).json({ accessToken })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }
}

module.exports = Users