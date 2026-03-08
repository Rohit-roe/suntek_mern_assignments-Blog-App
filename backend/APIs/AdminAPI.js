import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { UserTypeModel } from '../models/UserModel.js'
import {checkAdmin} from '../middlewares/checkAdmin.js'
export const adminRoute=exp.Router()

// read all articles
adminRoute.get('/articles/:adminId',verifyToken,async(req,res)=>{
    // get the userid from the req
    let user=req.params.adminId
    // if(!user){
    //     return res.status(401).json({message:"Invalid user"})
    // }
    //     // if ADMIN found but role is diff 
    // if(author.role!='ADMIN'){
    //     return res.status(403).json({message:"role is not an user"})
    // }
    // // check if author is active
    // if(!author.isActive){
    //     return res.status(403).json({message:"admin account is not active"})
    // }
    let allArticles=await ArticleModel.find({isArticleActive:true})

    res.status(200).json({message:"the article is :",payload:allArticles})
})
// Block the users
adminRoute.put('/block/:userId',verifyToken,checkAdmin,async(req,res)=>{
    let userId=req.params.userId
    let user=await UserTypeModel.findById(userId)
    if(!user ){
        return res.status(401).json({message:"user not found"})
    }
    if(user.isActive===false ){
        return res.status(401).json({message:"user is alreaday blocked"})
    }
    let blockedUser=await UserTypeModel.findByIdAndUpdate({_id:userId},{$set:{isActive:false}},{new:true})
    res.status(200).json({message:"The user has been blocked",payload:blockedUser})
})

// unblocking the blocked users
adminRoute.put('/unblock/:userId',verifyToken,checkAdmin,async(req,res)=>{
    let userId=req.params.userId
    let user=await UserTypeModel.findById(userId)
    if(!user ){
        return res.status(401).json({message:"user not found"})
    }
    if(user.isActive===true ){
        return res.status(401).json({message:"user is not blocked"})
    }
    let blockedUser=await UserTypeModel.findByIdAndUpdate({_id:userId},{$set:{isActive:true}},{new:true})
    res.status(200).json({message:"The user has been blocked",payload:blockedUser})
})