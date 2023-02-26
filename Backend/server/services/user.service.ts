// import entities
import { UserEntity } from "../entities";

// utils
import { DBConnect } from "../utils";

const createUser = async (userData: Object) => {
  const connection = await DBConnect.getConnection();
  return (await connection)
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values(userData)
    .execute();
};

const getUser = async (userData: Object) => {
  const connection = await DBConnect.getConnection();
  return (await connection)
    .createQueryBuilder()
    .from(UserEntity)
    .where(userData)
    .execute();
};

export {
  createUser,
  getUser
};