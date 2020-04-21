const express = require("express");
const router = new express.Router();

const Goal = require("../models/goal")

router.post("/goals" , async(req,res) => {
  
    const goalObj = new Goal(req.body)
    try{
        await goalObj.save();
        res.status(201).send({goalObj})
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.get("/goals", uservalidity, async (req, res) => {
    const userEmail = req.body.email;
    console.log("Getting goals for user - " + userEmail);
    try {
      await Goal.find({ email: userEmail }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Result set", docs.length);
          console.log(docs);
          res.status(200).send(docs);
        }
      });
      // console.log(allExpenses)
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });


  router.delete("/goals/:id", async (req, res) => {
    try {
      const goalObj = await Expense.findByIdAndDelete(req.params.id);
  
      if (!goalObj) {
        return res.status(404).send("Invalid deletion request");
      }
  
      res.send(goalObj);
    } catch (e) {
      res.status(500).send();
    }
  });


  