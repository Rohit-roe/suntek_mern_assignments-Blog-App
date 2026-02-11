import exp from 'express'
import { authenticate } from '../services/authService.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { UserTypeModel } from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
export const commonRoute=exp.Router()

// login
commonRoute.post('/authenticate',async(req,res)=>{
    // get user cred object
    let userCred=req.body
    // call the authenticate service
    let {token,user}=await authenticate(userCred)
    // save token as http only cookie
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    // send response
    res.status(200).json({message:"login successful",payload:user})
})

// logout
commonRoute.get('/logout',(req,res)=>{
    // clear the cookie named 'token'
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    res.status(200).json({message:"successfully logged out"})
})

// changing the password
commonRoute.put('/change-password',verifyToken,async(req,res)=>{
    // get the current and new password
    let {userId,email,password,newPassword}=req.body
    let user=await UserTypeModel.findOne({email})
    if(!user){
        res.status(401).json({message:"user is not present"})
    }
    // verify whether the current password given is correct
    let verifyPassword=await bcrypt.compare(password,user.password)
    if(!verifyPassword){
        res.status(401).json({message:"The given password is incorrect"})
    }
    // replace the current password with new one
    user.password=await bcrypt.hash(newPassword,10)
    const created =await user.save()
    // convert the document to new Object to remove old password
    const newUserObj=created.toObject()
    // delete the old password
    delete newUserObj.password
    // send the result
    res.status(200).json({message:"password changed successfully"})
})