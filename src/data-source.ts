import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"

let migrations: string[];
let host: string;
let port: number;
let username: string;
let password: string;
let database: string;
if (process.env.NODE_ENV === 'production') {
    migrations = ["build/migration/**/*.js"];
    host= "containers-us-west-38.railway.app";
    port= 5989;
    username= "postgres";
    password= "7QjLptsOf6qOtoh8erSb";
    database= "railway";
  } else {
    migrations = ["src/migration/**/*.ts"];
    host= "localhost";
    port= 5432;
    username= "postgres";
    password= "MtDbPass";
    database= "postgres";
  }

export const AppDataSource = new DataSource({
    type: "postgres",
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [Post, User],
    migrations: migrations,
    subscribers: [],
})