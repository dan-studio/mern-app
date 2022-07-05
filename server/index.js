const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

app.use(express.json())

// require('dotenv').config();
// const {PORT, MONGODB_URI} = process.env;
// const port = PORT || 4000
const port = 3001;

// mongoose.connect(MONGODB_URI)
mongoose.connect('mongodb+srv://mern:hbJfTH0SnFotEgsP@cluster0.naia9.mongodb.net/merndatabase?retryWrites=true&w=majority')

app.get("/getUsers",(req,res)=>{
  UserModel.find({}, (err, result) => {
    if (err){
      res.json(err)
    }else{
      res.json(result)
    }
  })
})

app.post("/createUser", async (req, res)=>{
  const user = req.body
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user)

})

app.listen(port, ()=>{
  console.log(`Server Runs on Port + ${port}`)
})