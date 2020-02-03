const Sequelize = require('sequelize');
const db = require('../db');
const Anunturi = db.define('anunturi', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title_anunt: Sequelize.STRING,
    content_anunt: Sequelize.STRING
});
module.exports = Anunturi;