const jwt = require('jsonwebtoken')
require('dotenv').config()

function createJwt (payload) {
    const token = jwt.sign(payload , process.env.JWT_SECRET )
    return token
}

function decodeToken (token) {
    const data = jwt.verify(token , process.env.JWT_SECRET)
    return data
}


module.exports = {
    createJwt,
    decodeToken
}