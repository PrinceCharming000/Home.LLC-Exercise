// import node moduels
import { DataSourceOptions } from "typeorm";
import "dotenv/config";

// import entities
import {
  UserEntity,
} from "../entities";

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const dbOptions: DataSourceOptions = {
  type: "mysql",
  host: DB_HOST,
  port: parseInt(DB_PORT || "3003"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  synchronize: true,
  entities: [
    UserEntity,
  ],
  extra: {
    connectionLimit: 10,
  },
};

export default dbOptions;