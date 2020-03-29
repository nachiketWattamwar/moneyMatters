const mongoose = require('mongoose')
const validator = require('validator')

const incomeSchema = new mongoose.Schema({
    email: {
        type: String,
        unique : true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }, 

    sourceType : {
        type: String,
        required: true,
        trim: true,
        required : true
    },

    amount : {
        type: Number, 
        required : true, 
        trim : true,
        required : true,
        validate(value) {
            if(value <= 0) {
                throw new Error("Invalid amount value")
            }
        }
    }
})

const Income = mongoose.model('Income' , incomeSchema);
module.exports = Income