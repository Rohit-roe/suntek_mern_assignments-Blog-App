import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { commonRoute } from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=exp()
config() // process.env
// add cors
app.use(cors({origin:["http://localhost:5173"]}))
// add body parser
app.use(exp.json())
// cookie parser middleware
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
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});
