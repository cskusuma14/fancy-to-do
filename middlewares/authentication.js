const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        console.log(req.headers)
        const accessToken = req.headers.accesstoken
        if (!accessToken) {
            res.status(400).json({ message: 'accessToken not found' })
        } else {
            const decode = jwt.verify(accessToken, 'secret')
            console.log(decode)
            req.userID = decode.userId
            next()
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports = authentication