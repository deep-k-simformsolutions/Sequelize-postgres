const {Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:deepkhunt7@localhost:5432/node_demo', { logging: false /*so that remove default executing line from console */ } )
/*Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect:'postgres' 
  });*/

//testing the connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:');
  }

  /*Observe that, in the examples above, Sequelize refers to the library 
  itself while sequelize refers to an instance of Sequelize, which represents a connection to one database. 
  This is the recommended convention and it will be followed throughout the documentation.*/

  module.exports = sequelize