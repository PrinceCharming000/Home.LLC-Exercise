// import node moduels
import express from 'express';
import { validate } from 'express-validation';

// import controllers
import { authController } from '../controllers';

// import validators
import { userValidator } from '../validators';

const authRouter = express.Router();

authRouter.post("/signin", validate(userValidator.signInValidator, {}, {}), authController.signIn);
authRouter.post("/signup", validate(userValidator.signUpValidator, {}, {}), authController.signUp);

export default authRouter;