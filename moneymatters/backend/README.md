# Backend APIs

## Sign Up - <br>
POST -  http://localhost:3001/users <br>
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
POST -  http://localhost:3001/users/login <br>
```json
{
	"email" : "nitish@yahoo.co.in",
	"password" : "12345678"
}
```
