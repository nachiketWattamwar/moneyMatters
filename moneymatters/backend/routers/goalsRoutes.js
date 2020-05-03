const express = require("express");
const router = new express.Router();
const { spawn } = require("child_process");

const Goal = require("../models/goal");
const uservalidity = require("../middleware/uservalidity");

router.post("/goals", async (req, res) => {
  const goalObj = new Goal(req.body);
  try {
    await goalObj.save();
    res.status(201).send({ goalObj });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/allgoals", async (req, res) => {
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
    //console.log("inside goals update param", req.params);
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
    console.log("inside delete backend", goalObj);
    res.send(goalObj);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/prediction", async (req, res) => {
  console.log("inside predicted alue", req.body);
  const fileName = `${req.body.email}.csv`;
  try {
    const pyprocess = spawn("python", [
      "C:/Users/Nachi/Documents/GitHub/masters295/MoneyMatters/moneymatters/PFMP.py",
      fileName,
    ]);
    pyprocess.stdout.on("data", (data) => {
      res.send(data.toString());
    });
  } catch (e) {
    console.log("ERROR! ", e);
  }
});

module.exports = router;
