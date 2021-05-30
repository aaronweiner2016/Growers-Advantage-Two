const db = require('../../models');
const router = require('express').Router();

router.post("/email", (req, res) => {
    console.log(req.body);
    db.Email.create(req.body
    ).then(dbEmail => {
        console.log(dbEmail);
        res.redirect("/");
    }
    ).catch(err => {
        console.log(err)
    })

})

module.exports = router;