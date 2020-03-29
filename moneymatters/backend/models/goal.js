const mongoose = require('mongoose')
const validator = require('validator')

const goalSchema = new mongoose.Schema({

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

    deadline : {
        type: Date, 
        required : true       
    }, 

    title : {
        type: String, 
        required : true       
    }, 

    amount : {
        type: Number, 
        required : true, 
        trim : true,
        required : true,
        validate(value) {
            if(value <= 0) {
                throw new Error("Invalid goal value")
            }
        }
    },

    category : {
        type: String,
        required: true,
        trim: true,
        required : true,
        validate(value) {
            if(!["Education", "Retirement", "Real estate", "Vacation"].includes(value)) {
                throw new Error("Invalid goal category type")
            }
        }
    }
})


const Goal = mongoose.model('Goal' , goalSchema);
module.exports = Goal


