const { Schema, model } = require('mongoose');
const modelName = 'Comment';

let schema = new Schema({
    id: { type: String, required: true },
    idPost: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = model(modelName, schema);