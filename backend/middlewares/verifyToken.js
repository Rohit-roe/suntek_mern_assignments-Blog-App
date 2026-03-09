import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const verifyToken = (...allowedRoles)=>{
return async (req, res, next) => {
  try {
        // res.clearCookie('token')
    // read token from req
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //verify the validity of the token
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // check if the user is allowed
    if(!allowedRoles.includes(decodedToken.role)){
      return res.status(403).json({message:"Forbidden.You don't have permission"})
    }

    // attach user info to req for use in routes
    req.user = decodedToken;

    next();

  } catch (err) {
    // jwt.verify thorws error if token is invalid/expired
    if(err.name==="TokenExpiredError"){
      return res.status(401).json({ message: "session Expired" });
    }
    if(err.name==="JsonWebTokenError"){
      return res.status(401).json({ message: "Invalid token.please login" });
    }
    //next(err);
  }
}
}