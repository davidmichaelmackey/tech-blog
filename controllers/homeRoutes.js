// import the express router
const router = require('express').Router();

// import the models folder
const { User, Post, postHistory } = require('../models');

// import the auth middleware
const withAuth = require('../utils/auth');

// get route handles the homepage
router.get('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  };
  const userData = await User.findOne({ where: { id: req.session.user_id } });
  const user = userData.get({ plain: true });
  res.render('homepage', {
    loggedIn: req.session.logged_in,
    user
  });
});

// get request route for login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  };
  res.render('login');
});

// get all posts
router.get('/allposts', async (req, res) => {
  try {
    if (req.session.logged_in !== true) {
      res.redirect('/login');
      return;
    }
    const postData = await Post.findAll();
    console.log(req.session.logged_in);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts', {
      posts, loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create post
router.get('/createpost', (req, res) => {
  if (req.session.logged_in !== true) {
    res.redirect('login');
    return;
  }

  res.render('createpost', {
    loggedIn: req.session.logged_in,
  });
});

// exports the router
module.exports = router;