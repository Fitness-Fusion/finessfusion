const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async register(req, res, next) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest('A user with that email address already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password: hashPassword, role })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({where: {email}})

        if(!user) {
            return next(ApiError.internal('A user not found'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword) {
            return next(ApiError.internal('Incorrect password'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async checkAuth(req, res, next) {
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
}

module.exports = new UserController()