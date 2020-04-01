# Backend APIs
Server URL : http://localhost:3001/
## Sign Up - <br>
POST -  /users <br>
```json
{
	"name" : "Nitish Joshi" , 
	"email" : "nitish@yahoo.co.in",
	"password" : "12345678",
	"address" : "Centerra Apts, New York 45712",
	"gender" : "Male"
}
```

## Login
POST -  /users/login <br>
```json
{
	"email" : "nitish@yahoo.co.in",
	"password" : "12345678"
}
```

## Create initial expenses
POST /expenses/initial <br> 
```json
{
	"email" : "nikhil@yahoo.co.in",
	"category" : "food",
	"amount" : 90,
	"timestamp" : "04-12-2018",
	"expenseType" : "Cash",
	"description" : "groceries"
}
```


## Create new expense
POST /expenses/ <br> 
```json
{
	"email" : "nikhil@yahoo.co.in",
	"category" : "food",
	"amount" : 5.89,
	"timestamp" : "03/30/2020",
	"paymentsource" : "Credit card"	
}
```
