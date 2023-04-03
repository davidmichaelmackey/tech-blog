const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: [ 'password' ] }
    });

    res.render('homepage', { user });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/allposts', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map(post => post.get({ plain: true }));

    res.render('all-posts', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/createpost', withAuth, (req, res) => {
  res.render('createpost');
});

module.exports = router;
