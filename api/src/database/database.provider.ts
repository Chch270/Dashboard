import { Sequelize } from "sequelize-typescript";
import { Widget } from "src/widgets/widget.entity";
import { User } from "../users/user.entity";

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_DB = process.env.POSTGRES_DB || 'dashboard_db';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'db',
        port: 5432,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
      });
      sequelize.addModels([User, Widget]);
      await sequelize.sync();
      return sequelize;
    },
  },
];