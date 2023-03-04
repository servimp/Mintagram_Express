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
    host= "containers-us-west-96.railway.app";
    port= 6454;
    username= "postgres";
    password= "nsl6w0CIuLAFnEor6Tei";
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