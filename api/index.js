const express = require('express');
const bodyParser = require("body-parser");
const AppDataSource = require("./data-source");
const Routes = require("./routes");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

AppDataSource.initialize().then(async () => {
  // create express app
  const app = express();
  app.use(bodyParser.json());

  // enable CORS
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  // Use cookie-parser middleware
  app.use(cookieParser());

  // register express routes from defined application routes
  Routes.forEach(route => {
    app[route.method](route.route, (req, res, next) => {
      const Controller = require(`./controller/${route.controller}`);
      const controller = new Controller();
      const result = controller[route.action](req, res, next);

      if (result instanceof Promise) {
        result
          .then(result => (result !== null && result !== undefined ? res.send(result) : undefined))
          .catch(error => console.error(error));
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  console.log("Express server has started on port 5000. Open http://localhost:5000/users to see results");

  // start express server
  app.listen(5000);
}).catch(error => console.error(error));
