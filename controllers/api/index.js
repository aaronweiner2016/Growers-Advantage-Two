const router = require('express').Router();
const emailRoutes = require('./emailRoutes');

router.use("/email", emailRoutes);

module.exports = router;