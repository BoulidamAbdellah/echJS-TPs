#!/usr/bin/env node
const express = require("express");
const session = require("express-session")
const mongoos = require("mongoose")
async function mongoconnect() {
    await mongoos.connect("mongodb://localhost:27017/Books_management").then(() =>{console.log("connected")}).catch((err)=>{
        console.log("err")
    })
  
}
mongoconnect()

const UserSchema = new mongoos.Schema({
 password: {
 type: mongoos.SchemaTypes.String,
 required: true,
  },
 email: {
 type: mongoos.SchemaTypes.String,
 required: true,
  }
  })
const user = mongoos.model("Users", UserSchema, "Users");
 const app = express();
  app.use(
 session({
 secret: "ADEDUIQDSKLFDSKQMLDKFSDKFLDSMQK", // For encrypting and decrypting the session
 resave: false,
 saveUninitialized: false,
  })
 )
 app.use(express.json());
 app.use(express.urlencoded())
 app.set("view engine","pug")
 app.set("views","./views")
 const PORT = 8080;
 let books =[
  { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: 1943 },
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997 }
];
 app.get("/",(req,res) =>{
    res.render("authentification")
 })
 app.post("/login",async (req,res)=>{
    let email = req.body.email
    let passwd = req.body.password
    console.log(typeof(email),typeof(passwd))
    const result = await user.find({email:email,password :passwd})
    console.log(result)
    if (result.length > 0){
        // res.redirect("/books")
        console.log("authentificated !")
        req.session.authentified = true
        res.redirect("/book")
    }
    else{
        res.render("authentification")
    }
 })
 app.get("/book" ,(req,res)=>{
    if (req.session.authentified){
    res.render("Books",{books})}
    else {
        res.redirect("/")
    }
 })
 app.listen(PORT, () => {
 });
 console.log(`Running Express server on port ${PORT}`)