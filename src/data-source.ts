import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "MtDbPass",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Post, User],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})
