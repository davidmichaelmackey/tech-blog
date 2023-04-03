
// import the router
const router = require('express').Router();

// import the user routes
const { User, Post } = require('../../models');

// import the create post routes
const withAuth = require('../../utils/auth');

// create new post
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newIndividPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newIndividPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get individual post by id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [ "name" ],
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("individual-post", {
      ...post,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;