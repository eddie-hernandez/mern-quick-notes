const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user) {
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}

async function create(req, res) {
    
    try {
        const user = await User.create(req.body)

        const token = createJWT(user)

        res.json(token)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function login(req, res) {
    try {
        // get the user that's trying to log in
        // check if the password is valid
            // if so, create a JWT and send it back
            // if not, throw an error
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw new Error()

        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            res.json(createJWT(user))
        }
        else {
            throw new Error()
        }
    }
    catch {
        res.status(400).json('Something happened while trying to log you in. Please Try Again.')
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

module.exports = {
    create,
    login,
    checkToken
}