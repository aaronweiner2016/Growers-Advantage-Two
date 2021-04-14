const navData = require('../lib/navData')

const data = {
  layout: '_layout.nkj',
  navbar: navData
}

module.exports = function(app) {

  // app.get("/", (req, res) => {
  //   res.render("coming-soon.njk", data)
  // })

  app.get("/", (req, res) => {
    res.render("index.njk", data)
  })

  app.get("/about", (req, res) => {
    res.render("about.njk", data)
  })

  app.get("/casestudy", (req, res) => {
    res.render("case-study.njk", data)
  })

  app.get("/contact", (req, res) => {
    res.render("contact.njk", data)
  })

  app.get("/presentation", (req, res) => {
    res.render("presentation.njk", data)
  })

  app.get("/pricing", (req, res) => {
    res.render("pricing.njk", data)
  })

  app.get("/services", (req, res) => {
    res.render("services.njk", data)
  })

  app.get("/404", (req, res) => {
    res.render("404.njk", data)
  })

}