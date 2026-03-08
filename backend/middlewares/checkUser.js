import { UserTypeModel } from "../models/UserModel.js";

export const checkUser = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserTypeModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    if (user.role !== "USER") {
      return res.status(403).json({ message: "User role is different" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User account is not active" });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: "Authorization failed",
      error: err.message
    });
  }
};

