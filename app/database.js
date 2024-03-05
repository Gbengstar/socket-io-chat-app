const { Sequelize } = require('sequelize');
const { configDotenv } = require('dotenv');
configDotenv();

const sequelize = new Sequelize(process.env.DATABASE, { dialect: 'postgres' });

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

exports.sequelize = sequelize;
