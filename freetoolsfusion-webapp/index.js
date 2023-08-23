const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

var fileupload = require("express-fileupload");
const cookiesRouter = require('./routes/cookiesRoute');
app.use(fileupload());

app.set("view engine", "ejs");
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1/cookies", cookiesRouter);

app.get("/", (req, res) => {
    res.render('index');
})
app.get("/iamadminrajeshkumar", (req, res) => {
    res.render('admin');
})
app.get("*", (req, res) => {
    res.redirect("/");
})
app.listen(3000, function() {
    console.log("Server is working ON 3000");
})