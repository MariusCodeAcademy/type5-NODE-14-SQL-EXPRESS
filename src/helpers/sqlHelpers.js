const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getDbArray(sql) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query(sql);
    await conn.close();
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getDbArray,
};
