const Sequelize = require('sequelize')
const databaseName = 'stack-a-thon'
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db

