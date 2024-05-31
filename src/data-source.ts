import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "test",
  synchronize: true,
  logging: true,
  //   entities: ["src/entities/*.ts"],
  entities: [User],
  subscribers: [],
  migrations: ["src/db/migrations/*.ts"],
});
