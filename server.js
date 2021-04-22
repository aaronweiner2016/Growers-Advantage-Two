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

// app.use((req, res, next) => {
//   if (process.env.NODE_ENV === 'production') {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       // the statement for performing our redirection
//       console.log('WHAT IS HAPPENING', req.headers.host, req.headers.host.includes('www.'));
//       if (req.headers.host.includes('www.')) {
//         return res.redirect('https://' + req.headers.host + req.url);
//       }
//       return res.redirect('https://www.' + req.headers.host + req.url);
//     }
//     else
//       return next();
//   } else
//     return next();
// });

var http = express();

// set up a route to redirect http to https
http.get('*', function (req, res) {
  res.redirect('https://' + req.headers.host + req.url);

  // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
  // res.redirect('https://example.com' + req.url);
})

// have it listen on 8080

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

