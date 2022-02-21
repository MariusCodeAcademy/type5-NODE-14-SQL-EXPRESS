const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
const { singleDbExecute } = require('../helpers/sqlHelpers');
const { getAllPosts, updatePostDb } = require('../model/postModel');

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

async function updatePost(req, res) {
  const newPostData = req.body;
  const idOfPostToUpdate = req.params.id;

  const updateResult = await updatePostDb(newPostData, idOfPostToUpdate);
  if (updateResult === false) {
    res.status(500);
    return;
  }
  res.json(updateResult);
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
  const sql = 'SELECT * FROM posts WHERE post_id = ?';
  const result = await singleDbExecute(sql, req.params.id);
  if (result === false) {
    res.status(500);
    return;
  }

  res.json(result);
}
async function deletePost(req, res) {
  const sql = 'DELETE FROM posts WHERE post_id = ? LIMIT 1';
  const deleteResult = await singleDbExecute(sql, req.params.id);
  // TODO: itraukti i singleDbExecute kad veiktu tik kai deletinam
  // if (deleteResult.affectedRows !== 1) {
  //   res.status(400).json('nei viena eilute neistrinta');
  //   return;
  // }
  if (deleteResult === false) {
    res.status(500);
    return;
  }
  res.json(deleteResult);
}

module.exports = {
  createPost,
  postsIndex,
  postsSingle,
  deletePost,
  updatePost,
};
