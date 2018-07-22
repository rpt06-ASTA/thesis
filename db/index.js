const Sequelize = require('sequelize');

// var connection = require('../config.js');
const DBNAME = process.env.DBNAME || require('../config.js').DBNAME
const DBUSERNAME = process.env.DBUSERNAME || require('../config.js').DBUSERNAME
const DBPASSWORD = process.env.DBPASSWORD || require('../config.js').DBPASSWORD
const DBHOST = process.env.DBHOST || require('../config.js').DBHOST
const DBPORT = process.env.DBPORT || require('../config.js').DBPORT

var db = new Sequelize(DBNAME, DBUSERNAME, DBPASSWORD, {
  host: DBHOST,
  port: DBPORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: 'Amazon RDS'
  }
});


// if (process.env.DATABASE_URL !== undefined) {
//   var db = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'mysql',
//     protocol: 'mysql',
//     logging:  true
//   })

// } else {
//   var db = new Sequelize('knowhow', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
//   })
// }

db
  .authenticate()
  .then(() => {
    console.log('Connected to knowhow');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
