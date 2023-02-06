const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'host', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize