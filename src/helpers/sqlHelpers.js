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

async function singleDbExecute(sql, id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    // const sql = 'SELECT * FROM posts WHERE post_id = ?';
    console.log('singleDbExecute sql, id ===', sql, id);
    const [rows] = await conn.execute(sql, [id]);
    await conn.close();
    console.log('rows ===', rows);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getDbArray,
  singleDbExecute,
};
