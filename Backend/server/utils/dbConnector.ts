// node_modules
import { createDatabase } from "typeorm-extension";
import { DataSourceOptions, createConnection, DataSource } from "typeorm";

// config
import { dbOptions } from '../config';

class DBController {
  connection: DataSource | null = null;

  dbCreate: Function = async () => {
    const options: DataSourceOptions = dbOptions;
    await createDatabase({
      ifNotExist: true,
      options
    });
    this.connection = await this.dbConnection();
  }

  dbConnection: Function = async () => {
    return await createConnection(dbOptions);
    // return await this.dbCreate();
  }

  getConnection: Function = async () => {
    if (this.connection === null) {
      this.connection = await this.dbConnection();
    } else {
      return this.connection;
    }
  }
}

const DBConnect = new DBController();

export default DBConnect;