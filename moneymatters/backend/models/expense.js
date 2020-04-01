const mongoose = require('mongoose')
const validator = require('validator')

const User = require('../models/user');
const expenseSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

    description : {
        type: String,
        trim: true
    },

    category : {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!["food", "bills", "rent","travel"].includes(value.toLowerCase())) {
                throw new Error("Invalid expense category type")
            }
        }
    }, 

    amount : {
        type: Number, 
        required : true, 
        trim : true,
        validate(value) {
            if(value <= 0) {
                throw new Error("Invalid amount value")
            }
        }
    }, 

    timestamp : {
        type : Date,
    } , 

    expenseType : {
        type : String,
        required : true
    }

})

const Expense = mongoose.model('Expense' , expenseSchema);
module.exports = Expense