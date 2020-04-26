const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
when we pass an object structure to the mongoose model, mongoose creates a 
schema in the background. To have validations before the schema is created express provides 
Middleware functions. We can create the schema separately and then pass it to mongoose. 
*/

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },

  primaryincome: {
    type: Number,
    trim: true,
  },

  country: {
    type: String,
  },

  gender: {
    type: String,
    validate(value) {
      if (!["male", "female"].includes(value.toLowerCase())) {
        throw new Error("Invalid gender value");
      }
    },
  },

  age: {
    type: Number,
    trim: true,
  },

  profession: {
    type: String,
    trim: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  //object that called the method
  const user = this;

  // const token = jwt.sign({  _id : user._id.toString()   } , 'secretKey')
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(payload, "secretKey");

  user.tokens = user.tokens.concat({ token });
  console.log(token);
  await user.save();
  return token;
};

// statics method can be used directly on User method. Used in the userRoutes.js
userSchema.statics.findByCredentials = async (email, password) => {
  const userFromDatabase = await User.findOne({ email });

  if (!userFromDatabase) {
    console.log("Wrong email");
    throw new Error("Unable to login");
  } else {
    console.log(userFromDatabase);
  }

  const isMatch = bcrypt.compareSync(password, userFromDatabase.password);
  console.log(isMatch);
  if (isMatch) {
    return userFromDatabase;
  }

  console.log("Wrong password");
  throw new Error("Fail");
};

// Arrow functions do not bind "this". Second arg needs to be a standard function
// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  //Access to the user to be saved before it is passed to mongoose
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
