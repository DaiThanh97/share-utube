const mongoose = require('mongoose');
const { COLLECTION_NAME } = require('./../configs/constants');

const MovieSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTION_NAME.USER,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model(COLLECTION_NAME.MOVIE, MovieSchema);
