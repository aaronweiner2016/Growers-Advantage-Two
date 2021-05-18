const navData = require('../lib/navData')
const db = require('../models')
const Category = require('../models')


const data = {
  layout: '_layout.nkj',
  navbar: navData
}

module.exports = function (app) {

  app.get("/", async (req, res) => {
    res.render("coming-soon.njk", data)
  })



  app.get("/index", async (req, res) => {
    res.render("index.njk", data)
  })



  app.get("/about", async (req, res) => {
    res.render("about.njk", data)
  })



  app.get("/casestudy", async (req, res) => {
    res.render("case-study.njk", data)
  })



  app.get("/contact", async (req, res) => {
    res.render("contact.njk", data)
  })



  app.get("/presentation", async (req, res) => {
    res.render("presentation.njk", data)
  })



  app.get("/pricing", async (req, res) => {
    res.render("pricing.njk", data)
  })



  app.get("/services", async (req, res) => {
    res.render("services.njk", data)
  })



  app.get("/404", async (req, res) => {
    res.render("404.njk", data)
  })



  app.get("/residential", async (req, res) => {

    try {

      const productData = await db.Product.findAll(
        {
          where: {
            category_id: 1,
          }
          // include: [
          //   {
          //     model: db.Category
          //   }
          // ]
        }
      );

      const products = productData.map((data) => data.get({ plain: true }));
      console.log(products);

      res.render('product/residential.njk', {
        ...data,
        products
      });
    } catch (err) {
      res.status(500).json(err);
    }
  })



  app.get("/commercial", async (req, res) => {

    try {

      const productData = await db.Product.findAll(
        {
          where: {
            category_id: 2,
          }
          // include: [
          //   {
          //     model: db.Category
          //   }
          // ]
        }
      );

      const products = productData.map((data) => data.get({ plain: true }));
      console.log(products);

      res.render('product/commercial.njk', {
        ...data,
        products
      });
    } catch (err) {
      res.status(500).json(err);
    }
  })



  app.get("/cart", async (req, res) => {
    res.render("product/cart.njk", data)
  })



  // app.get("/checkout",async (req, res) => {
  //   res.render("product/checkout.njk", data)
  // })



  app.get("/product", async (req, res) => {
    res.render("product/product.njk", data)
  })




  app.get("/search", async (req, res) => {
    res.render("search/search.njk", data)
  })



  app.get("/case-study-1", async (req, res) => {
    res.render("search/case-study/case-study-1.njk", data)
  })



}