//Connects to database

const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api' , {
mongoose.connect(
	"mongodb+srv://mongouser:mongouser@cmpe295b-h0sia.mongodb.net/maindb?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
);
