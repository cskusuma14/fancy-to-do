const { Todo } = require('../models')

const authorization = (req, res, next) => {
    Todo.findByPk(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'todo not found' })
            } else {
                if (data.UserId == req.userID) {
                    next()
                } else {
                    res.status(401).json({ message: 'Not Authorized' })
                }
            }
        })
}

module.exports = authorization