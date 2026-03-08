import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { commonRoute } from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'

const app=exp()
config() // process.env

// add body parser
app.use(exp.json())
app.use(cookieParser())
// function declaration vs func expression

// connect to db
const connectDB=async()=>{
    try{await connect(process.env.DB_URL)
    console.log("DB connection is a success")
    // start http server
    app.listen(process.env.PORT,()=>console.log("server started"))
    }
    catch(err){
        console.log("Error connecting to DB")
    }
}
connectDB()
// connect to the APIs
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRoute)
// dealing with invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url} is an Invalid path`})
})

// error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    return res.status(404).json({message:"error occurred",reason:err.message})
})
