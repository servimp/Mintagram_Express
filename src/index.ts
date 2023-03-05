import 'reflect-metadata';
import express, { Request, Response } from 'express';
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();

// rest of your code here

AppDataSource.initialize();

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // enable CORS
    app.use(cors({ origin: ['http://localhost:3000','https://mintagram-react.vercel.app'], credentials: true }));

    // Use cookie-parser middleware
    app.use(cookieParser());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
  

    console.log("Express server has started. Open http://localhost:5000/users to see results")

