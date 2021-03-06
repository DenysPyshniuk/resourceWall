const { db } = require("../server.js");

//Categories
//-------Get all categories-------
const getAllCategories = () => {
  const queryString = `SELECT DISTINCT * FROM post_categories ORDER BY id;`;
  return db
    .query(queryString)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

//-------Get all categories by Post_id------
const getCategoryByPost = (post_id) => {
  const queryString = `
  SELECT category
  FROM post_categories
  JOIN posts ON posts.category_id = post_categories.id
  WHERE posts.id = $1;`;
  return db
    .query(queryString, [post_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => console.error(err.stack));
};

//-----Get category info by category name------
const getCategoryByName = (category) => {
  const queryString = `
  SELECT category
  FROM post_categories
  WHERE category iLike $1;`;
  return db
    .query(queryString, [`%${category}%`])
    .then((result) => {
      if (result.rows.length) {
        return result.rows;
      }
      result.json({ message: "no resources found" });
    })
    .catch((err) => console.error(err.stack));
};

//---------Get all posts by a category ID----------
const getPostsByCategoryId = (category_id) => {
  const queryString = `
  SELECT posts.*, post_categories.category as category
  FROM posts
  JOIN post_categories ON post_categories.id = posts.category_id
  WHERE category_id = $1;`;
  return db
    .query(queryString, [category_id])
    .then((result) => {
      if (result.rows.length) {
        return result.rows;
      }
      result.json({ message: "no resources found" });
    })
    .catch((err) => console.error(err.stack));
};

module.exports = {
  getCategoryByPost,
  getCategoryByName,
  getAllCategories,
  getPostsByCategoryId,
};
