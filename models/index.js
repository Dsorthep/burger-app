'use strict';
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require(__dirname + '/../config/config.json') [env];
const basename = path.basename(__filename);
const env = process.NODE_ENV || 'development';
const db = {};


let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
fs.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
fs.forEach(file => {
    const model = sequelize['import'] (path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
