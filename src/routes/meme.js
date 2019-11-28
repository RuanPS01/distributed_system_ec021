const Router = require('restify-router').Router
const dataDbController = require('../controllers/meme')
const authController = require('../controllers/auth')

var dataDbRouter = new Router()
dataDbRouter.use(authController.verifyTokenJWT)   //token verification
dataDbRouter.get('/:id', dataDbController.search)   //search
dataDbRouter.post('/', dataDbController.insert)     //create
dataDbRouter.patch('/:id', dataDbController.update) //update
dataDbRouter.del('/', dataDbController.delete)      //delete
module.exports = dataDbRouter