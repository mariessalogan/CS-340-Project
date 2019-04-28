var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_loganma',
  password        : 'Ilovesean2',
  database        : 'cs340_loganma'
});

module.exports.pool = pool;
