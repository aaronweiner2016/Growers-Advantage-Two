const db = require('../models');

module.exports = function (app) {

    app.post("/api/email", (req, res) => {
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
}