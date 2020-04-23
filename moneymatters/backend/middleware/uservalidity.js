const User = require("../models/user");

const uservalidity = async (req, res, next) => {
  try {
    //console.log("inside validation=========", req);
    const userObj = await User.findOne({ email: req.body.email });

    if (userObj == null) {
      console.log("User not found - ", req.body.email);
      return res.status(400).send("No such user found");
    }
  } catch (err) {
    return res.status(400).send(err);
  }

  console.log("User validation for " + req.body.email + " successful");
  next();
};

module.exports = uservalidity;
