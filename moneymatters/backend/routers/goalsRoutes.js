const express = require("express");
const router = new express.Router();
const {spawn} = require('child_process')

const Goal = require("../models/goal")
const uservalidity = require("../middleware/uservalidity");

router.post("/goals" , uservalidity, async(req,res) => {
  
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


  /*
 * Update
 */
router.patch("/goals/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "amount", "startdate", "enddate"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const goalObj = await Goal.findById(req.params.id);

    updates.forEach((update) => {
      goalObj[update] = req.body[update];
    });

    await goalObj.save();
    res.status(200).send(goalObj);
  } catch (e) {
    res.status(400).send(e);
  }
});


  router.delete("/goals/:id", async (req, res) => {
    try {
      const goalObj = await Goal.findByIdAndDelete(req.params.id);
  
      if (!goalObj) {
        return res.status(404).send("Invalid deletion request");
      }
  
      res.send(goalObj);
    } catch (e) {
      res.status(500).send();
    }
  });

  router.get("/mygoals" , async(req , res) => {
    
    try {
        const pyprocess = spawn('python' , ["D:/dummy.py"])
        pyprocess.stdout.on('data' , (data) => {
        res.send(data.toString());
        })
    }
    catch(e) {
      console.log("ERROR! ",e)
    }
  })


  module.exports = router;


  