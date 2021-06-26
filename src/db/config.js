const sqlite3 = require('sqlite3');
const path = require('path');
const { open } = require('sqlite');

module.exports = () => open({
      filename: path.join(__dirname, 'rocketq.sqlite'),
      driver: sqlite3.Database
   });
