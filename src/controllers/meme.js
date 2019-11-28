const axios = require('axios')

const Meme = require('../models/meme')

module.exports = {
    async insert(req, res) { //////////////////////////////// create meme
        const { titulo, descricao, ano } = req.body
        const meme = await Meme.create({
            titulo,
            descricao,
            ano
        })
        console.log(meme)
        res.send(201, meme)
    },

    async update(req, res) { //////////////////////////////// update meme
        const { titulo, descricao, ano } = req.body
        const { id } = req.params
        const response = await Meme.updateOne({ _id: id }, {
            titulo,
            descricao,
            ano
        })

        if(response.nModified == 1 && response.ok == 1) {
            console.log(`O meme ${titulo} foi atualizado!`)
            const meme = await Meme.findById(id)
            return res.send(200, meme)
        }
        res.send(400)
    },

    async search(req, res) { //////////////////////////////// search meme
        const { id } = req.params
        let meme
        if(id) {
            meme = await Meme.findById(id)
            console.log(`Mene encontrado: ${meme.titulo}`)
        } else {
            meme = await Meme.find()
            console.log(`${meme.length} cadastros encontrados`)
        }

        // res.send(200)
        res.json(meme)
    },

    async delete(req, res) { //////////////////////////////// delete meme
        const { id } = req.body
        const response = await Meme.deleteOne({ _id: id })
        if(response.deletedCount == 1 && response.ok == 1) {
            console.log(`${id} removido`)
            return res.send(204)
        }
    }
}