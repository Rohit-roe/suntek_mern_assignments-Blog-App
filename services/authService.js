import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { UserTypeModel } from "../models/UserModel.js"
import { config } from "dotenv"

config()
// register function
export const register=async(userObj)=>{
// create document
const userDoc=new UserTypeModel(userObj)
// validate for empty passwords
await userDoc.validate()
// hash and replace the password
userDoc.password=await bcrypt.hash(userDoc.password,10)
// save the document
const created =await userDoc.save()
// convert the document to new Object to remove old password
const newUserObj=created.toObject()
// remove the un-hashed password
delete newUserObj.password
// return new user obj so that the hashed password can be returned
return newUserObj

}

// authenticate function
export const authenticate=async({email,password})=>{
    // check user with email & role
    const user=await UserTypeModel.findOne({email})
    if(!user){
        const err=new Error("Invalid email")
        err.status=401
        throw err
    }
    // compare password
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
         const err=new Error("Invalid password")
        err.status=401
        throw err
    }
    // user is there but is blocked
     if(!user.isActive){
         const err=new Error("Your account is blocked by the Admin please contact the admin")
        err.status=403
        throw err
    }
    // create a token
    const token=jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "1h" }
)

    const userObj=user.toObject()
    delete userObj.password
    return{token,user:userObj}
}