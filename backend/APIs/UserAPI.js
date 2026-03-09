import exp from 'express'
import {register,authenticate} from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
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
userRoute.get('/articles/:userid',verifyToken("USER"),async(req,res)=>{
    // get the userid from the req
    let user=req.params.userid
    // if(!user){
    //     return res.status(401).json({message:"Invalid user"})
    // }
    //    // if author found but role is diff
    // if(user.role!='USER'){
    //     return res.status(403).json({message:"role is not an user"})
    // }
    // // check if author is active
    // if(!user.isActive){
    //     return res.status(403).json({message:"User account is not active"})
    // }
    let allArticles=await ArticleModel.find({isArticleActive:true})

    res.status(200).json({message:"the article is :",payload:allArticles})
})
// add comment to the user
userRoute.put('/articles',verifyToken("USER"),async(req,res)=>{
    // get the details from req
    let {userId,articleId,comments}=req.body
    // check user
    if(userId!=req.user.userId){
        res.status(403).json({message:"Forbidden"})
    }
    // update the article
    let updatedArticle=await ArticleModel.findByIdAndUpdate({articleId,isArticleActive:true},{$push:{comments:{user:userId,comment:comments}}},
        {new:true,runValidators:true})

    // if article not found
    if(!updatedArticle){
       return res.status(401).json({message:"article not found"})
    }
    // send the response
    res.status(200).json({message:"article updated",payload:updatedArticle})
})