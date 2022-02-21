const { getDbArray } = require('../helpers/sqlHelpers');

function getAllPosts() {
  return getDbArray('SELECT * FROM posts');
}

module.exports = {
  getAllPosts,
};
