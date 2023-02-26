// node_modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

// import constants
import { MESSAGES, ERRORS } from '../constants';

// import services
import { userService } from '../services';

// config
import { JWT_TOKEN, EXPIRATION_TIME } from '../config';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;
    const [user] = await userService.getUser({ emailAddress: emailAddress });
    console.log(user);
    if (!user) {
      res.status(ERRORS.USER_NOT_EXIST.status).json({ message: MESSAGES.USER_NOT_EXIST });
      console.error(MESSAGES.USER_NOT_EXIST);
      return;
    }

    const passwordCorrect: boolean = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      res.status(ERRORS.INCORRECT_PASSWORD.status).json({ message: MESSAGES.INCORRECT_PASSWORD });
      console.error(MESSAGES.INCORRECT_PASSWORD);
      return;
    }

    const token = jwt.sign({
      id: user.id,
      name: user.name,
      role: user.role,
      userType: user.user_type
    }, JWT_TOKEN, {
      expiresIn: EXPIRATION_TIME
    });

    res.status(200).json({
      userId: user.id,
      token,
      expirationTime: EXPIRATION_TIME
    });

    console.info(MESSAGES.SIGNIN_SUCCESS);
  } catch (error) {
    console.error(error);
    res.status(ERRORS.BAD_REQUEST.status).json({ message: MESSAGES.BAD_REQUEST });
    console.error(MESSAGES.BAD_REQUEST);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      password,
      emailAddress,
    } = req.body;

    const result = await userService.getUser({ emailAddress });
    if (result.length !== 0) {
      res.status(ERRORS.DUPLICATED_USER.status).json({ message: MESSAGES.DUPLICATED_USER });
      console.error(MESSAGES.DUPLICATED_USER);
      return;
    }

    const userData = {
      firstName,
      lastName,
      hashPassword: await bcrypt.hash(password, 8),
      emailAddress,
    };

    const userResponse = await userService.createUser(userData);

    res.status(200).json({
      res: userResponse["identifiers"][0],
      message: MESSAGES.SIGNUP_SUCCESS
    });
    console.info(MESSAGES.SIGNUP_SUCCESS);
  } catch (error) {
    console.error(error);
    res.status(ERRORS.BAD_REQUEST.status).json({
      message: MESSAGES.BAD_REQUEST
    });
    console.error(MESSAGES.BAD_REQUEST);
  }
};