// import node modules
import { Joi } from 'express-validation';

export const signInValidator = {
  body: Joi.object({
    emailAddress: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
  })
};

export const signUpValidator = {
  body: Joi.object({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
    emailAddress: Joi.string()
      .email()
      .required(),
  })
};
