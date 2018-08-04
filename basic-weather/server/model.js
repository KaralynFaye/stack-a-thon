const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  alertHour: {
    type: Sequelize.INTEGER,
    defaultValue: 7
  },

  startHour: {
    type: Sequelize.INTEGER,
    defaultValue: 8
  },

  endHour: {
    type: Sequelize.INTEGER,
    defaultValue: 8
  },

  pushToken: {
    type: Sequelize.STRING
  }
})

module.exports = User
