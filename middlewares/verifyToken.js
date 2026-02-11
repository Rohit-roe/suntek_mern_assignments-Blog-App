import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const verifyToken = async (req, res, next) => {
  try {
        // res.clearCookie('token')
    // read token from req
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //verify the validity of the token
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
