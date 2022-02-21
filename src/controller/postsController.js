const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

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

module.exports = {
  createPost,
};
