// import node moduels
import express from 'express';

// import routers
import authRouter from './auth.route';

// import validationErrorHandler
import { validationErrorHandler } from '../validators';

const appRoutes = express.Router();

appRoutes.use('/auth', authRouter);

appRoutes.use(validationErrorHandler);

export default appRoutes;