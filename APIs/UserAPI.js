import exp from 'express'
import {register,authenticate} from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { checkUser } from '../middlewares/checkUser.js'
export const userRoute=exp.Router()

// register user
userRoute.post('/users',async(req,res)=>{
    // get user obj from req
    let userObj=req.body
    // register
    const newUserObj=await register({...userObj,role:"USER"})
    // send res
    res.status(201).json({message:"user created",payload:newUserObj})
})
// authenticate user

// read all articles(protected)
userRoute.get('/articles/:userid',verifyToken,checkUser,async(req,res)=>{
    // get the userid from the req
    let user=req.params.userid
    // if(!user){
    //     return res.status(401).json({message:"Invalid user"})
    // }
    //     // if author found but role is diff 
    // if(author.role!='USER'){
    //     return res.status(403).json({message:"role is not an user"})
    // }
    // // check if author is active
    // if(!author.isActive){
    //     return res.status(403).json({message:"Author account is not active"})
    // }
    let allArticles=await ArticleModel.find({isArticleActive:true})

    res.status(200).json({message:"the article is :",payload:allArticles})
})
// add comment to the user
userRoute.put('/articles',verifyToken,checkUser,async(req,res)=>{
    // get the details from req
    let {userId,articleId,comments}=req.body

    // find the article 
    let articleOfDB=await ArticleModel.findById({_id:articleId})
    if(!articleOfDB){
       return res.status(401).json({message:"article not found"})
    }
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$push:{comments:{user:userId,comment:comments}}},{new:true})
    
    // send the response
    res.status(200).json({message:"article updated",payload:updatedArticle})
})