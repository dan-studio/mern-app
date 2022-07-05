const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const dotenv = require('dotenv')
app.use(express.json())

dotenv.config();
const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI, ()=>console.log("DB Connected"))

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