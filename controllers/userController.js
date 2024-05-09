require('dotenv').config()
const User=require('../models/userModel')
const {connect}=require('mongoose')
const {hash,compare}=require('bcryptjs')
const {sign} = require('jsonwebtoken')

//...............REGISTER CONTROLLER
const register=async (req,res) =>{
  const {username,password,email}=req.body;
try {
 await connect(process.env.MONGO_URL)
// console.log('DB CONNECTED')
const checkExist=await User.exists({email:email})
if(checkExist){
  res.json({
    message:"user already exists"
  })}
  else{
    await User.create({username,email,password:await hash(password,12)})
    // console.log("success")
      res.status(201).json({
        message:"Done"
      })
      
  }
}

catch (error) {
  res.json({
    message:"Error"
  })
  
}

  
}
const login=async(req,res) =>{
  const {email,password} =req.body;
  try {
    await connect(process.env.MONGO_URL)
    const checkExistUser=await User.findOne({email:email})
    if(!checkExistUser){
      res.status(404).json({
        message:'User not found'
      })
    }
    else{
  const {email,password} =req.body;
  const decryptPass=await compare(password,checkExistUser.password)
  console.log(decryptPass);
  if(email==checkExistUser.email && decryptPass){

    const token=sign({
      username:checkExistUser.username,
      id:checkExistUser._id,
      email:checkExistUser.email
    },process.env.JWT_SECRET
    )
    res.status(200).json({
      message:"successfully signed in ",
      token:token
    })
  }
else{
  res.json({
    message:"invalid  credentials"
  })

}
      
    }
    
    
  } catch (error) {
    
  }
 

}
module.exports={register,login}