const axios = require('axios')

exports.login = (req, res) => {   //////////////////////////////////////// Login
    console.log('Login')
    const { username, password } = req.body
    console.log(`Usuario ${username} e senha ${password}`)

    let url = "https://ec021-2019-2-av2-auth.herokuapp.com/auth/login"
    let postData = { username, password }
    let axiosConfig = {}

    axios.post(url, postData, axiosConfig)
        .then(sucess => {
            console.log(sucess.data)
            res.json(sucess.data)
        })
        .catch(err => {
            console.log(err)
            res.send("Login inválido")
        }) 
}

exports.verifyTokenJWT = async (req, res, next) => { /////////////////// Validação de token
    const { token } = req.headers
    console.log(`Verify: ${token}`)
    if(token == null) return res.send(403, { Erro: 'Token não recebido' })

    let url = "https://ec021-2019-2-av2-auth.herokuapp.com/auth/validateToken"
    let postData = {}
    let axiosConfig = {
        headers: {
            token
        }
    }
    await axios.post(url, postData, axiosConfig)
        .then(sucess => {
            console.log(sucess.data)
            next()
        })
        .catch(err => {
            console.log(err.data)
            res.send(401, { Erro: "Token inválido" })
        })
}
