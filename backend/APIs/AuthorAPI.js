import exp from 'express'
import {register,authenticate} from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
import {ArticleModel} from '../models/ArticleModel.js'
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
authorRoute.post('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    // get the article from req
    let newArticle=req.body
    // check for the author
    if(newArticle.author!=req.user.userId){
        res.status(403).json({message:"Forbidden"})
    }
    let author=await UserTypeModel.findById(newArticle.author)
    // create a article document
    const newArticleDoc=new ArticleModel(newArticle)
    // save the document
    let created=await newArticleDoc.save()
    // send the res
    res.status(201).json({message:"article created",payload:created})
})
// read article
authorRoute.get('/articles/:authorId',verifyToken("AUTHOR"),async(req,res)=>{
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
authorRoute.put('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    // get modified article from req
    let {author,articleId,title,category,content}=req.body
    // find the article
    if(author!=req.user.userId){
        res.status(403).json({message:"Forbidden"})
    }
    let articleOfDB=await ArticleModel.findOne({_id:articleId,author:author})
    if(!articleOfDB){
        return res.status(401).json({message:"article not found"})
    }
    // check if the article published is of the author logged in
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{title,category,content}},{new:true})
    res.status(200).json({message:"article updated",payload:updatedArticle})
})
// delete(soft delete) article
// authorRoute.delete('/articles/:articleId/author/:aid',verifyToken("AUTHOR"),async (req,res) => {
//     //get the article id from the url
//     let artId = req.params.articleId
//     let authorId = req.params.aid
//     if(authorId!=req.user.userId){
//         res.status(403).json({message:"Forbidden you can only delete your articles"})
//     }
//     if(artId.isArticleActive===isArticleActive){
//         return res.status(400).json({message:`Article is already ${isArticleActive} ?"active ":"not active"`})
//     }
//     //find the article and update the isArticleActive field
//     let deletedArticle = await ArticleModel.findByIdAndUpdate(
//         {_id:artId,author:authorId},
//         {$set:{isArticleActive:false}},
//         {new:true}
//     )
//     //send res
//     res.status(200).json({message:"soft delete is performed!",payload:deletedArticle})
// })

//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  console.log("Article author:", article.author.toString());
  console.log("Logged in user:", req.user.userId);
  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  // if (req.user.role === "AUTHOR" && 
  //   article.author.toString() !== req.user.userId) {
  //   return res
  //   .status(403)
  //   .json({ message: "Forbidden. You can only modify your own articles" });
  // }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});