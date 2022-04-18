
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Conversation } from "./entity/Conversation";
import { Message } from "./entity/Message";
import { User } from "./entity/User";

config()
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Message,Conversation],
  migrations: [],
  subscribers: [],
});

export default AppDataSource

