const express = require('express');
const mysql = require('mysql2/promise');
const { createPost } = require('../controller/postsController');
const dbConfig = require('../dbConfig');

const postsRoutes = express.Router();

postsRoutes.post('/createPost1', createPost);

postsRoutes.post('/createPost1', async (req, res) => {
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
});
postsRoutes.get('/createTablePosts', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem ===');
    // const word = 'blue\'s'
    const sql = `
    CREATE TABLE posts ( 
      post_id INT NOT NULL AUTO_INCREMENT , 
      author VARCHAR(30) NOT NULL , 
      title VARCHAR(30) NOT NULL , 
      body TEXT NOT NULL , 
      created_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
      PRIMARY KEY (post_id)) ENGINE = InnoDB;
    `;
    // const ats = await connection.query(sql);
    // const rows = ats[0];

    // const fields = ats[1];
    // masyvo destrukturizacija
    const [rows, fields] = await connection.query(sql);

    // visi veiksmai su db
    await connection.close();

    res.json(rows);
  } catch (error) {
    console.log('klaida prisijungiant', error);
    res.status(500).send('klaida kazkur del kazko');
  }
});

// GET /posts (grazinas visus posts) SELECT * FROM posts
postsRoutes.get('/posts', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT * FROM posts');
    await conn.close();
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
// GET /posts/:id (grazinas single post) SELECT * FROM posts
postsRoutes.get('/posts/:id', async (req, res) => {
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
});

// GET /posts/:id (trina viena posta ir isitikinam kad istryne)
// DELETE FROM posts WHERE post_id = ? LIMIT 1

postsRoutes.delete('/posts/:id', async (req, res) => {
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
});

module.exports = postsRoutes;
