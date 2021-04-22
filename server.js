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
    if (req.headers['x-forwarded-proto'] !== 'https') {
      console.log('WHAT IS HAPPENING', req.headers.host, req.headers.host.includes('www.'));
      if (req.headers.host.includes('www.')) {
        return res.redirect('https://' + req.headers.host + req.url);
      } else if (!req.headers.host.includes('www.')) {
        return res.redirect('https://www.' + req.headers.host + req.url);
      } else if (!req.headers.host.includes('https://www.'))
        return res.redirect('https://www.' + req.headers.host + req.url);
    }
    else
      return next();
  } else
    return next();
});

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('404.njk');
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

