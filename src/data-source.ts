import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "containers-us-west-96.railway.app",
    port: 6454,
    username: "postgres",
    password: "nsl6w0CIuLAFnEor6Tei",
    database: "railway",
    synchronize: true,
    logging: false,
    entities: [Post, User],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})
