
// import the router
const router = require('express').Router();

// import the user routes
const { User, Post } = require('../../models');

// withAuth
const withAuth = require('../../utils/auth');

// create a new post
// router.post('/', async (req, res) => {
//   const userData = await Post.create(req.body);
//   res.json(userData);
// });

router.post("/", withAuth, (req, res) => {
  console.log("creating");
  Post.create({
    title: req.body.title,
    content: req.body.post_content,
    user_id: req.session.user_id
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// export the router
module.exports = router;