// utils
import { DBConnect } from '../utils';

// consts
import { MESSAGES } from '../constants';

const databaseSetup = async (next: Function) => {
  try {
    await DBConnect.getConnection();
    console.info(MESSAGES.DATABASE_CONNECTION_SUCCESS);
    next();
  } catch (error) {
    console.log(error);
    console.error(MESSAGES.DATABASE_CONNECTION_FAILURE);
  }
};

export default databaseSetup;