const mongoose = require('mongoose')

const nodeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

})

const nodeModel = mongoose.model('notes', nodeSchema);

module.exports = nodeModel