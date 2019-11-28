const { Schema, model } = require('mongoose')
const dataMemeSchema = new Schema(
    {
        titulo: {type: String, required: true},
        descricao: {type: String, required: true},
        ano: {type: Number, required: true},
    }
)
module.exports = model('Meme', dataMemeSchema)