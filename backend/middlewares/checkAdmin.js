import { UserTypeModel } from "../models/UserModel.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id; // from verifyToken

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserTypeModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Role is not Admin" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User account is not active" });
    }

    // attach user if needed later
    req.userDoc = user;

    next();
  } catch (err) {
    res.status(500).json({
      message: "User authorization failed",
      error: err.message
    });
  }
};
