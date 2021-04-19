const express = require("express");
const logger = require("morgan");
const nunjucks = require('nunjucks')
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;
const sslRedirect = require('heroku-ssl-redirect');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.use(sslRedirect());

require("./controllers/html-routes")(app);
require("./controllers/api-routes")(app);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

