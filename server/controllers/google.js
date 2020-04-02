const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');

class Google {
    static login(req, res) {
        const token = req.body.token

        let newUser = {}
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(data => {
                const payload = data.getPayload()
                console.log(payload)
                newUser.name = payload.name
                newUser.username = payload.name
                newUser.email = payload.email
                newUser.password = 'password@123'
                newUser.role = 'User'

                return User.findOne({
                    where: { email: payload.email }
                })
            })
            .then(userData => {
                if (userData) {
                    return userData
                } else {
                    return User.create(newUser)
                }
            })
            .then(newData => {
                let objUser = {
                    userId: newData.id,
                    username: newData.username,
                    email: newData.email,
                    role: newData.role
                }
                const accessToken = jwt.sign(objUser, process.env.JWT_SECRET)
                res.status(201).json({ accessToken })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }
}

module.exports = Google