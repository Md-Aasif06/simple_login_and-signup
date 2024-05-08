const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existinguser = await collection.findOne({ name: data.name })
    if (existinguser) {
        res.send("user already exits,please choose a different username")
    } else {
        const saltRounds = 10;
        const hassedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hassedPassword;
        const userdata = await collection.insertMany(data)
        console.log(userdata);
    }
})

//login
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username })
        if (!check) {
            res.send("user name can not found")
        }

        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password)
        if(isPasswordMatch){
            res.render("home")
        }else{
            res.send("wrong password")
        }
    }catch{
        res.send("wrong details")
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`server has started at port no :${port}`);
})