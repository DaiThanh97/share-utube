const mongoose = require('mongoose');
const { COLLECTION_NAME } = require('./../configs/constants');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model(COLLECTION_NAME.USER, UserSchema);
