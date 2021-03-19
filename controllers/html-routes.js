const navData = require('../lib/navData')


module.exports = function(app) {

  app.get("/", (req, res) => {
    const data = {
      layout: '_layout.nkj',
      navbar: navData
    }

    res.render("index.njk", data)
  })



}