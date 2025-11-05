import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const protectRoute = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found. Invalid token",
        });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
  } catch (error) {
    console.log("Error in protectRoute: ", error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export default protectRoute;
