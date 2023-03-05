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
const port = process.env.PORT || 5000;

// enable CORS
app.use(cors({ 
  origin: 'https://mintagramreact-production.up.railway.app', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use(bodyParser.json())

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

app.listen(port, () => {
    console.log('testing other logs on start-up');
    console.log(`5Express server has started on port: ${port}.`);
});
