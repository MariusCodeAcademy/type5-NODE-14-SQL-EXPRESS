const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const { getDbArray } = require('../helpers/sqlHelpers');

function getAllPosts() {
  return getDbArray('SELECT * FROM posts');
}

async function updatePostDb(newPostData, id) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const sql = `
    UPDATE posts 
    SET author = ?, title = ?, body = ? 
    WHERE post_id = ?
    LIMIT 1
    `;
    const { author, title, body } = newPostData;
    const [rows] = await connection.execute(sql, [author, title, body, id]);

    await connection.close();
    return rows;

    // res.json('ok');
  } catch (error) {
    console.log('klaida prisijungiant', error);
    return false;
  }
}

module.exports = {
  getAllPosts,
  updatePostDb,
};
