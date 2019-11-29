const restify = require('restify')
var mongoose = require('mongoose')
const routesAuth = require('./routes/auth')
const routesMeme = require('./routes/meme')

var app = restify.createServer();
app.use(restify.plugins.bodyParser())
app.use(restify.plugins.queryParser());
routesAuth.applyRoutes(app)
routesMeme.applyRoutes(app, '/meme')

//#region Data Base Configs
var dataBaseURL = "mongodb+srv://adauto:adauto@cluster0-rven8.mongodb.net/test?retryWrites=true&w=majority",
dataBase_setting = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    dbName: "ec021-av2-core"
}

mongoose.connect(dataBaseURL, dataBase_setting, (err) => {
    if(!err) {
        console.log(`Estabelecida a conexão: ${dataBase_setting.dbName}`)
    } else {
        console.log(`ERRO: ${err}`)
    }
})
//#endregion

/* //Login Ruan Patrick de Souza
var user = {
    "username": "ruan.patrick",
    "password": "1173"
};
authRoutes.login(user);
*/

app.listen(3000, function(){
    console.log('listening on *:3000');
  });