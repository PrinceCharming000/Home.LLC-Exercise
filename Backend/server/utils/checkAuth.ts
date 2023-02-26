// node_modules
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// import config
import { JWT_TOKEN } from "../config";

// import constants
import {
  MESSAGES,
  ERRORS
} from "../constants";

const checkAuth = (req: any, res: Response, next: Function) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, JWT_TOKEN);

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(ERRORS.UNAUTHORIZED_REQUEST.status).json({
      message: MESSAGES.UNAUTHORIZED_REQUEST
    });
    console.log(MESSAGES.UNAUTHORIZED_REQUEST);
  }
};

export default checkAuth;