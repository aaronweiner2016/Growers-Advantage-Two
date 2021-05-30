const express = require("express");
const logger = require("morgan");
const path = require("path");
const nunjucks = require('nunjucks')
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require("./controllers");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      console.log('WHAT IS HAPPENING', req.headers.host, req.headers.host.includes('www.'));
      if (req.headers.host.includes('www.')) {
        return res.redirect('https://' + req.headers.host + req.url);
      } else if (!req.headers.host.includes('www.')) {
        return res.redirect('https://www.' + req.headers.host + req.url);
      }
    }
    else
      return next();
  } else
    return next();
});



nunjucks.configure('views', {
  autoescape: true,
  express: app
})
// app.set('view engine', 'njk')


app.use(routes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

