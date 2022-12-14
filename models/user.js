const mongoose = require('mongoose');
const crypto = require('crypto');
// const {v1: uuidv1} = require('uuid');
const uuidv1 = require('uuidv1');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt:  {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
     type: Array,
     default: []
    }
}, {timestamps: true})

//virtual field

userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = function(password) {
        return bcrypt.compareSync(password, this.password)
    }
})
.get(function() {
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText) {
    return bcrypt.hash(plainText, this.hashed_password)
    // return this.encryptPassword(this.plainText) === this.hashed_password

    },
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('shal', this.salt)
            .update(password)
            .digest('hex')
        } catch(err) {
            return '';
        }
    }
}

module.exports = mongoose.model("User", userSchema)