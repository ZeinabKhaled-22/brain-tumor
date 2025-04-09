import { User } from "../../db/index.js";
import {AppError} from "../utilies/appError.js"
import {roles, status} from "../utilies/constant/enums.js"
import {messages} from "../utilies/constant/messages.js"
import { verifyToken}from "../utilies/token.js"


export const isAuthenticated = () => {
  return async (req, res, next) => {
    const { token } = req.headers;
    // decoded token
    const payload = verifyToken({ token });
    if (payload.message) {
      return next(new AppError(payload.message, 401));
    }
    // check user existence
    const authUser = await User.findOne({
      _id: payload._id,
      status: status.VERIFIED,
    }); // {}, null
    if (!authUser) {
      return next(new AppError(messages.user.notFound, 404));
    }
    req.authUser = authUser;
    next();
  };
};
