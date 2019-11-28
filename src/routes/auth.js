const Router = require('restify-router').Router
const authController = require('../controllers/auth')

var authRouter = new Router()
//authRouter.post('/auth/login', authController.login)         
authRouter.post('/auth/validateToken', authController.token)    
module.exports = authRouter