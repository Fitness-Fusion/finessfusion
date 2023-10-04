const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/aurtMiddleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.checkAuth)

module.exports = router