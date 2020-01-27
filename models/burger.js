// REQUIRING SEQUELIZE
const Sequelize = require('sequelize')

// CREATING A MODEL FOR OUR BURGER USING SEQUELIZE
module.exports = function(sequelize, DataTypes) {
    class Burger extends Sequelize.Model {}

    Burger.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDevoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {sequelize, modelName: 'Burger'});
    return Burger;
}