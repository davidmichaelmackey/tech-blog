// imports router from express
const router = require("express").Router();

// imports the User model
const { User, Post } = require("../../models");

// new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// get all posts associated with a user
router.get("/posts", async (req, res) => {
  console.log("/api/users/posts");
  try {
    if (req.session.logged_in !== true) {
      res.redirect("/login");
      return;
    }
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    console.log(req.session.logged_in);
    const posts = postData.map((Post) => Post.get({ plain: true }));
    console.log(posts);
    res.render("my-posts", {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// exports the router
module.exports = router;