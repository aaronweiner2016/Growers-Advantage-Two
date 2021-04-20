const express = require("express");
const logger = require("morgan");
const nunjucks = require('nunjucks')
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https')
      // the statement for performing our redirection
      return res.redirect('https://' + req.headers.host + req.url);
    else
      return next();
  } else
    return next();
});

nunjucks.configure('views', {
  autoescape: true,
  express: app
})


require("./controllers/html-routes")(app);
require("./controllers/api-routes")(app);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

