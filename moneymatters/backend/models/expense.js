const mongoose = require('mongoose')
const validator = require('validator')

const expenseSchema = new mongoose.Schema({

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

    category : {
        type: String,
        required: true,
        trim: true,
        required : true,
        validate(value) {
            if(!["food", "bills", "rent", "others"].includes(value.toLowerCase())) {
                throw new Error("Invalid expense category type")
            }
        }
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
    } , 

    timestamp : {
        type : Date,
        required : true
    }

})

const Expense = mongoose.model('Expense' , expenseSchema);
module.exports = Expense