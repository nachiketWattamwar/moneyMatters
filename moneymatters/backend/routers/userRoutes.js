const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { spawn } = require("child_process");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
//models
const User = require("../models/user");

//signing up user
router.post("/users", (req, res) => {
  let predictedValue = null;
  const userData = req.body;
  const name = req.body.email;
  const fileName = `${name}.csv`;
  const csvWriter = createCsvWriter({
    path: fileName,
    header: [
      { id: "primaryIncome", title: "primaryIncome" },
      { id: "age", title: "Age" },
      { id: "female", title: "female" },
      { id: "male", title: "male" },
      { id: "professional", title: "Professional" },
      { id: "students", title: "Students" },
      { id: "canada", title: "Canada" },
      { id: "USA", title: "USA" },
      { id: "england", title: "England" },
      { id: "india", title: "India" },
      { id: "april", title: "April" },
      { id: "february", title: "February" },
      { id: "january", title: "January" },
      { id: "june", title: "June" },
      { id: "march", title: "March" },
      { id: "may", title: "May" },
    ],
  });
  const data = [
    {
      primaryIncome: req.body.primaryincome,
      age: req.body.age,
      female: req.body.gender == "female" ? 1 : 0,
      male: req.body.gender == "male" ? 1 : 0,
      professional: req.body.profession == "Professional" ? 1 : 0,
      students: req.body.profession == "Student" ? 1 : 0,
      canada: req.body.country == "canada" ? 1 : 0,
      USA: req.body.country == "USA" ? 1 : 0,
      india: req.body.country == "india" ? 1 : 0,
      england: req.body.country == "England" ? 1 : 0,
      april: 1,
      february: 0,
      january: 0,
      june: 0,
      march: 0,
      may: 0,
    },
  ];

  csvWriter.writeRecords(data).then(() => {
    console.log("The CSV file was written successfully");
    const pyprocess = spawn("python", [
      "C:/Users/Nachi/Documents/GitHub/masters295/MoneyMatters/moneymatters/PFMP.py",
      fileName,
    ]);
    pyprocess.stdout.on("data", async (data) => {
      predictedValue = data.toString();
      const user = new User(userData);
      try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token, predictedValue });
      } catch (e) {
        res.status(400).send(e);
      }
    });
  });
});

//Logging in user
// findByCredentials lives as a static method on the model "User"
// generateAuthToken lives as an instance method on the object "user"
router.post("/users/login", async (req, res) => {
  try {
    const userFromDatabase = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await userFromDatabase.generateAuthToken();
    console.log(token);
    res.send({ userFromDatabase, token });
  } catch (e) {
    res.status(400).send("Login failed");
  }
});

router.post("/getProfileInfo", async (req, res) => {
  try {
    const userObj = await User.findOne({ email: req.body.email });
    res.send({ userObj });
  } catch (e) {
    res.status(400).send("User not found");
  }
});

//To add middleware to an individual route pass "auth" as an argument
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    if (!user) {
      console.log("No such user");
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
