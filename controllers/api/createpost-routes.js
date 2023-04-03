
// import the router
const router = require('express').Router();

// import the user routes
const { User, Post } = require('../../models');

// withAuth
// const withAuth = require('../../utils/auth');

// create a new post
router.post('/', async (req, res) => {
  const userData = await Post.create(req.body);
  res.json(userData);
});

// export the router
module.exports = router;