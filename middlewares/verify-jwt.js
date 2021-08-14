import jwt from "jsonwebtoken";
import userModel from "../models/users/userModel.js";

export const VERIFY_JWT_TOKEN = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    if (!accessToken) {
      res.status(401).json({
        message: "invalid credentials, please log out",
      });
    } else {
      const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN_KEY);
      if (decoded) {
        const user = await userModel.findOne(
          { _id: decoded.id },
          { password: 0 }
        );
        next();
      }
    }
  } catch (error) {
    const newError = new Error();
    newError.message = error.message;
    newError.status = 500;
    next(newError);
  }
};
