module.exports = function(app) {

  app.get("/", (req, res) => {
    const data = {
      layout: '_layout.nkj'
    }

    res.render("index.njk", data)
  })



}