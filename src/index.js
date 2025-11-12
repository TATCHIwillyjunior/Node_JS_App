console.log("Node JS App Test File");

const userOne = {
    firstName: "Bog",
    age: 27,
    admin: false
}

userOne.age = 30
console.log(userOne);

const sport = ["tennis", "golf", "volleyball"]
console.log(sport);


// ES Modules 

//const express = require("express")
import express from "express"

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
	    firstName: "John",
	    lastName: "Wick"
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

