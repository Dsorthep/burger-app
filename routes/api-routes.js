// REQUIRING OUR DB FROM MODELS
const db = require('../models');

module.exports = function(app) {

    // ROUTE TO CREATE A BURGER
    app.post("/burgers", async function(req, res) {
        try {
            const burger = await db.Burger.create({ name: req.body.name, isDevoured: req.body.isDevoured});
            res.json(burger);
        }
        catch (error) {
            console.log(error);
        }
    });
    // ROUTE TO GET ALL THE BURGERS
    app.get("/api/burgers", (req, res) => {
        db.Burger.findAll({}).then(burger => {
            res.json(burger);
        }).catch(function(error){console.log(error)});
    });

    // ROUTE TO UPDATE A BURGER
    app.post("/api/burgers", async function(req, res) {
        const burger = await db.Burger.update({ isDevoured: '1'}, { where: { id: req.body.id} });
        res.json(burger);
    });
}

