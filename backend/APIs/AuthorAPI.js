import exp from 'express'
import {register,authenticate} from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
import {ArticleModel} from '../models/ArticleModel.js'
import { checkAuthor } from '../middlewares/checkAuthor.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const authorRoute=exp.Router()

// register author
authorRoute.post('/users',async(req,res)=>{
    // get user obj from req
    let userObj=req.body
    // register
    const newUserObj=await register({...userObj,role:"AUTHOR"})
    // send res
    res.status(201).json({message:"author created",payload:newUserObj})
})

// create article
authorRoute.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
    // get the article from req
    let newArticle=req.body
    // check for the author
    let author=await UserTypeModel.findById(newArticle.author)
    // create a article document
    const newArticleDoc=new ArticleModel(newArticle)
    // save the document
    let created=await newArticleDoc.save()
    // send the res
    res.status(201).json({message:"article created",payload:created})
})
// read article
authorRoute.get('/articles/:authorId',verifyToken,checkAuthor,async(req,res)=>{
    // get author id
    let authorId=req.params.authorId
    // check the author
    // if(!author){
    //     return res.status(401).json({message:"Invalid author"})
    // }
    // read articles
    let articlesP=await ArticleModel.find({author:authorId,isArticleActive:true}).populate("author","firstName lastName email")
    // if(!articlesP){
    //     return res.status(401).json({message:"No articles posted"})
    // }
    res.status(201).json({message:"articles:",payload:articlesP})
})
// edit article
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
    // get modified article from req
    let {author,articleId,title,category,content}=req.body
    // find the article
    let articleOfDB=await ArticleModel.findOne({_id:articleId,author:author})
    if(!articleOfDB){
        return res.status(401).json({message:"article not found"})
    }
    // check if the article published is of the author logged in
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{title,category,content}},{new:true})
    res.status(200).json({message:"article updated",payload:updatedArticle})
})
// delete(soft delete) article
authorRoute.delete('/articles/:articleId/author/:aid',checkAuthor,async (req,res) => {
    //get the article id from the url
    let artId = req.params.articleId
    let authorId = req.params.aid
    //find the article and update the isArticleActive field
    let deletedArticle = await ArticleModel.findByIdAndUpdate(
        {_id:artId,author:authorId},
        {$set:{isArticleActive:false}},
        {new:true}
    )
    //send res
    res.status(200).json({message:"soft delete is performed!",payload:deletedArticle})
})