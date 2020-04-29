//Nikhil

require("./db/mongoose");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");

//models
const User = require("./models/user");
const Expense = require("./models/expense");

//Routers
const userRouter = require("./routers/userRoutes");
const expenseRouter = require("./routers/expenseRoutes");
const goalsRouter = require("./routers/goalsRoutes");

//Nikhil - end
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// const { mongoose } = require("../backend/db/mongoose");

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.json());
// app.use(userRouter);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(userRouter);
app.use(expenseRouter);
app.use(goalsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log("Express server is running on localhost:", port)
);

app.use("/recentFiveExpenses", (req, res) => {
  const recentData = [
    {
      id: 0,
      date: "16 Mar, 2019",
      name: "Costco Co.",
      paymentMethod: "VISA ⠀•••• 3719",
      amount: 312.44,
    },
    {
      id: 1,
      date: "16 Mar, 2019",
      name: "PG&E",
      paymentMethod: "VISA ⠀•••• 2574",
      amount: 866.99,
    },
    {
      id: 2,
      date: "16 Mar, 2019",
      name: "Gas",
      paymentMethod: "MC ⠀•••• 1253",
      amount: 100.81,
    },
    {
      id: 3,
      date: "16 Mar, 2019",
      name: "Medical Bills",
      paymentMethod: "AMEX ⠀•••• 2000",
      amount: 654.39,
    },
    {
      id: 4,
      date: "15 Mar, 2019",
      name: "Pet",
      paymentMethod: "VISA ⠀•••• 5919",
      amount: 212.79,
    },
  ];

  res.send(recentData);
});

// myFunc()
