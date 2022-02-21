const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
const { getAllPosts } = require('../model/postModel');

async function createPost(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem ===');

    const sql = `
    INSERT INTO posts (author, title, body) VALUES 
    (?, ?, ?)
    `;
    // lvl1
    // const author = req.body.author;
    // const title = req.body.title;
    // const body = req.body.body;
    // lvl2
    // const { author } = req.body;
    // const { title } = req.body;
    // const { body } = req.body;
    // lvl3
    const { author, title, body } = req.body;
    // console.log(Object.values(req.body));
    // console.log('Object.values(req.body) ===', Object.values(req.body));

    // console.log('req.body ===', req.body);

    const [rows, fields] = await connection.execute(sql, [author, title, body]);

    // visi veiksmai su db
    await connection.close();
    res.json({
      rows,
      fields,
    });
    // res.json('ok');
  } catch (error) {
    console.log('klaida prisijungiant', error);
    res.status(500).send('klaida kazkur del kazko');
  }
}

async function postsIndex(req, res) {
  const allPostsArr = await getAllPosts();

  if (allPostsArr === false) {
    res.status(500);
    return;
  }

  res.json(allPostsArr);
}
async function postsSingle(req, res) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts WHERE post_id = ?';
    const [rows] = await conn.execute(sql, [req.params.id]);
    await conn.close();
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const conn = await mysql.createConnection(dbConfig);
    // // DELETE FROM posts WHERE post_id = ? LIMIT 1
    const sql = 'DELETE FROM posts WHERE post_id = ? LIMIT 1';
    const [deleteResult] = await conn.execute(sql, [id]);
    await conn.close();
    if (deleteResult.affectedRows !== 1) {
      res.status(400).json('nei viena eilute neistrinta');
      return;
    }
    res.json(deleteResult);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

module.exports = {
  createPost,
  postsIndex,
  postsSingle,
  deletePost,
};
