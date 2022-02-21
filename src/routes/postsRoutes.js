const express = require('express');
const {
  createPost,
  postsIndex,
  postsSingle,
  deletePost,
} = require('../controller/postsController');

const postsRoutes = express.Router();

postsRoutes.post('/createPost1', createPost);
postsRoutes.get('/posts', postsIndex);
postsRoutes.get('/posts/:id', postsSingle);
postsRoutes.delete('/posts/:id', deletePost);

module.exports = postsRoutes;
