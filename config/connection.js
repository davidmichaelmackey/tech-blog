// Import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// Import the dotenv package
require('dotenv').config();

// Create connection to our database, pass in your MySQL information for username and password
let sequelize;

// Connect to JawsDB on Heroku
// If deployed, use the deployed database. Otherwise use the local database
if (process.env.JAWSDB_URL) {
  // Connect to the Heroku JawsDB
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Connect to local database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

// Export the connection
module.exports = sequelize;