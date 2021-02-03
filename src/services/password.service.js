const bcrypt = require('bcryptjs');

exports.hash = async password => {
    return await bcrypt.hash(password, 12);
};

exports.isEqual = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}