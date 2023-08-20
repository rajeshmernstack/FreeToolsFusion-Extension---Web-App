const express = require('express');
const app = express();
const cookiesRouter = require('./routes/cookiesRoute');

app.set("view engine", "ejs");
app.use(express.static('public'))

app.use("/api/v1/cookies", cookiesRouter);

app.get("/", (req, res) => {
    res.render('index');
})
app.listen(3000, function() {
    console.log("Server is working ON 3000");
})