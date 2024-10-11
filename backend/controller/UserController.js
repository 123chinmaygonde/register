const express = require("express")
const User = require('../model/User')

const router = express.Router()

router.get('/api/user',async(req,res)=>{
    try {
        const user = await User.findOne()
        
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.post('/api/user',async(req,res)=>{
    const {email,password}= req.body;
    try {
        const newUser = await new User({email,password})
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.put('/api/user',async(req,res)=>{
    const {id} = req.body;
    try {
        const updateUser = await new User.findByIdAndUpdate(id)
        res.status(200).json("user updated")
    } catch (error) {
        res.status(400).json("no user found")
    }
})

router.delete('/api/user',async(req,res)=>{
    const {id}= req.body
    try {
        const deleteUser = await new User.findByIdAndDelete(id)
        res.status(200).json('user deleted')
    } catch (error) {
        res.status(500).json("user not found")
    }
})

module.exports=router