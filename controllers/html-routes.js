const navData = require('../lib/navData')
const db = require('../models')
const router = require("express").Router();

const data = {
  layout: '_layout.nkj',
  navbar: navData
}

router.get("/", async (req, res) => {
  res.render("coming-soon.njk", data)
})

router.get("/index", async (req, res) => {
  try {
    const productData = await db.Products.findAll(
      {
        where: {
          category_id: 1,
        }
      }
    );

    const products = [];

    for (var i = 0; i < 3; i++) {
      products.push(productData[i].get({ plain: true }));
    }

    res.render('index.njk', {
      ...data,
      products
    });
  } catch (err) {
    console.log(err)
  }
})



router.get("/about", async (req, res) => {
  res.render("about.njk", data)
})



router.get("/casestudy", async (req, res) => {
  res.render("case-study.njk", data)
})



router.get("/contact", async (req, res) => {
  res.render("contact.njk", data)
})



router.get("/services", async (req, res) => {
  res.render("services.njk", data)
})



router.get("/404", async (req, res) => {
  res.render("404.njk", data)
})



router.get("/residential", async (req, res) => {

  try {
    const productData = await db.Products.findAll(
      {
        where: {
          category_id: 1,
        }
      }
    );

    const products = [];

    for (var i = 0; i < 3; i++) {
      products.push(productData[i].get({ plain: true }));
    }

    console.log(products)
    res.render('product/residential.njk', {
      ...data,
      products
    });
  } catch (err) {
    console.log("Errorr", err)
    res.status(500).json("ERRR", err);
  }
})



router.get("/commercial", async (req, res) => {

  try {

    const productData = await db.Products.findAll(
      {
        where: {
          category_id: 2,
        }
      }
    );

    const products = productData.map((data) => data.get({ plain: true }));
    console.log("commercial", products);

    res.render('product/commercial.njk', {
      ...data,
      products
    });
  } catch (err) {
    res.status(500).json(err);
  }
})




router.get("/cart", async (req, res) => {
  res.render("product/cart.njk", data)
})



router.get("/checkout", async (req, res) => {
  res.render("product/checkout.njk", data)
})



router.get("/product", async (req, res) => {
  res.render("product/product.njk", data)
})

router.get("/product/:id", async (req, res) => {
  try {
    const product = await db.Products.findOne(
      {
        where: {
          id: req.params.id,
        }
      }
    );
    console.log("PRODUCTSSS", product)
    // why coming up null but still displaying????
    res.render("product/product.njk", {
      ...data,
      product
    })
  } catch (err) {
    console.log("ERR", err)
    res.status(500).json(err);
  }
})



router.get("/search", async (req, res) => {
  res.render("search/search.njk", data)
})



router.get("/case-study-1", async (req, res) => {
  res.render("search/case-study/case-study-1.njk", data)
})



router.get('/examples/:page', async (req, res) => {
  res.render(`docs/${req.params.page}.njk`)
})

router.get('*', function (req, res) {
  res.render('404.njk');
});


module.exports = router;
