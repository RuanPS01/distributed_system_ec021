const restify = require('restify')
var mongoose = require('mongoose')
var serveStatic = require('serve-static-restify')
const authRoutes = require('./controllers/auth')
const memeRoutes = require('./controllers/meme')
const app = restify.createServer();

app.pre(serveStatic('../', {'index': ['index.html', 'index.htm']}))
app.use(restify.plugins.bodyParser())
app.use(restify.plugins.queryParser());

//authRoutes.applyRoutes(app)
//memeRoutes.applyRoutes(app, '/meme')

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

/*
var user = {
    "username": "ruan.patrick",
    "password": "1173"
};
authRoutes.login(user);
*/
var selectedRow = null

//#region functions for html


function onLoginSubmit(){
    if (validateLogin()) {
        var formData = readFormLogin();
        var user = {
            "username": "",
            "password": ""
        };
        user.username = formData.usuario;
        user.password = formData.senha;
        let val  = authRoutes.login(user);
        console.log(val);
    }
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormLogin() {
    var formData = {};
    formData["usuario"] = document.getElementById("usuario").value;
    formData["senha"] = document.getElementById("senha").value;
    return formData;
}

function readFormData() {
    var formData = {};
    formData["titulo"] = document.getElementById("titulo").value;
    formData["descricao"] = document.getElementById("descricao").value;
    formData["ano"] = document.getElementById("ano").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("memelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.titulo;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.descricao;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.ano;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("ano").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("titulo").value = selectedRow.cells[0].innerHTML;
    document.getElementById("descricao").value = selectedRow.cells[1].innerHTML;
    document.getElementById("ano").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.titulo;
    selectedRow.cells[1].innerHTML = formData.descricao;
    selectedRow.cells[2].innerHTML = formData.ano;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("memelist").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("titulo").value == "") {
        isValid = false;
        document.getElementById("tituloValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("tituloValidationError").classList.contains("hide"))
            document.getElementById("tituloValidationError").classList.add("hide");
    }
    return isValid;
}
function validateLogin() {
    isValid = true;
    if (document.getElementById("usuario").value == "") {
        isValid = false;
        document.getElementById("loginValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("loginValidationError").classList.contains("hide"))
            document.getElementById("loginValidationError").classList.add("hide");
    }
    return isValid;
}

//#endregion

app.listen(3000, function(){
    console.log('listening on *:3000');
  });