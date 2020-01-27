// DEPENDENCIES
const express = require('express');

// UTILIZING EXPRESS
const app = express();

// DEFINING THE PORT
const PORT = process.env.PORT || 3000;

// REQUIRING THE DATABASE FROM MODELS
const db = require("./models");

// UTILIZING EXPRESS TO HANDLE PARSING OF DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES
require("./routes/api-routes")(app);


// SYNCING SEQUELIZE MODELS AND STARTING SERVER
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("APP LISTENING ON PORT" + PORT);
    });
});