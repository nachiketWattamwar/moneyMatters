var mongoose = require("mongoose");
const db =
	"mongodb+srv://nachiket:nachiket@cmpe280-emqpv.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(
	db,
	{
		poolSize: 10
		// other options can go here
	},
	() => {
		console.log("connected to mongoDB");
	}
);

module.exports = { mongoose };
