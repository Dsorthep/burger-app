// REQUIRING OUR DB FROM MODELS
const db = require('../models');

module.exports = function(app) {

    // ROUTE TO CREATE A BURGER
    app.post("/api/burgers/", async function(req, res) {
        const burger = await db.Burger.create({ burger_name: req.body.burger_name});
        res.json(burger);
    });

    // ROUTE TO GET ALL THE BURGERS
    app.get("/api/burgers", (req, res) => {
        db.Burger.findAll({}).then(burgers => {
            res.json(burgers);
        });
    });

    // ROUTE TO UPDATE A BURGER
    app.post("/api/burgers/:id", async function(req, res) {
        const burger = await db.Burger.update({ devoured: true}, { where: { id: req.params.id} });
    });
};

