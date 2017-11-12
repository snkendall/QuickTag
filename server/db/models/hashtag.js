const Sequelize = require('sequelize');
const db = require('../db');

const Hashtag = db.define('hashtag', {
    tag: {
        type: Sequelize.STRING
    }
});

// export const Comment = db.define('comment', {
// });

module.exports = Hashtag;
