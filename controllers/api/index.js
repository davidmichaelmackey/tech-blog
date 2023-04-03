// import the router
const router = require('express').Router();

// import the user routes
const userRoutes = require('./user-routes');

// import the create post routes
const createPostRoutes = require('./createpost-routes');

// import the individual post routes
const postRoutes = require('./individual-post-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);
router.use('/createpost', createPostRoutes);
router.use('/posts', postRoutes);

// export the router
module.exports = router;