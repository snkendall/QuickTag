const Sequelize = require('sequelize');
const db = require('../db');

const Relationship = db.define('relationship', {
    hashtagId: {
        type: Sequelize.INTEGER
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    siblingTagId: {
        type: Sequelize.INTEGER
    }
})

Relationship.prototype.increaseCount = () => {
    this.count = this.count++
}

module.exports = Relationship;
