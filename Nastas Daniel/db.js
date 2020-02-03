const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('./config');
const db = new Sequelize(
    config.dataSource.database,
    config.dataSource.username,
    config.dataSource.password, {
        host: config.dataSource.host,
        dialect: "mysql",
        operatorsAliases: Op,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
module.exports = db;