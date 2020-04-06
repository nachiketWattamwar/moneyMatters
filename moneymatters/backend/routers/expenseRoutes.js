const express = require('express')
const router = new express.Router() 
const auth = require('../middleware/auth')

//models
const Expense = require('../models/expense');
const User = require('../models/user');
const uservalidity = require('../middleware/uservalidity')


/*
* Create inital average expenses on signup
*/
router.post('/expenses/initial' , uservalidity , async(req,res) => {
        
    try {
        const exp = new Expense(req.body); 
        await exp.save();     

        var objArr = []
        const d = new Date( req.body.timestamp );
        for(i = 0 ; i < 5 ; i++) {       
            const temp = new Expense(req.body);  
            temp.timestamp = new Date(d.setMonth(d.getMonth()-1))
            objArr.push(temp);        
        }

        Expense.collection.insertMany(objArr , (err,docs) => {
            if(err) {
                console.log("Error on batch insert" , err)
            }
            else {
                console.log("Batch insert successful")
            }
        })
        
        res.status(200).send(req)
    }
    catch (e) {
        res.status(400).send(e);
    }
})


/*
* Create new expense 
*/
router.post('/expenses' , uservalidity , async(req,res) => {
        
    try {
        const exp = new Expense(req.body); 
        await exp.save();  
        res.status(201).send(exp)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
})

/*
* All expenses of a particular user. 
*/
router.get("/expenses" , uservalidity , async (req , res) => {

    const userEmail = req.body.email
    console.log("Getting expenses for user - "+userEmail)
    try {
        await Expense.find({email : userEmail} , (err , docs) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Result set",docs.length);
                console.log(docs);
                res.status(200).send(docs)   
            }
        })
        // console.log(allExpenses)
       
    }
    catch(e) {
        console.log(e)
        res.status(400).send(e);
    }



})

/*
* Update 
*/
router.patch("/expenses/:id"  , async (req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'amount', 'expenseType' , 'category']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        const exp = await Expense.findById(req.params.id);
        
        updates.forEach((update) => {
            exp[update] = req.body[update]
        })

        await exp.save()
        res.status(200).send(exp)
    }
    catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router