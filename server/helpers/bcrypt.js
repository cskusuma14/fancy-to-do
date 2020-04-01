const bcrypt = require('bcrypt');
const saltRounds = 8;

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash
}

const checkPassword = (password, hashedPassword) => {
    const valid = bcrypt.compareSync(password, hashedPassword);
    return valid
}

module.exports = { hashPassword, checkPassword }