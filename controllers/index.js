// This file is the main controller file that will be used to route all of the requests to the correct controller file
const router = require('express').Router();

// Import all of the API routes from /api/index.js
const apiRoutes = require('./api');

// Import all of the home page routes from /homeRoutes.js
const homeRoutes = require('./homeRoutes');

// Add prefix of `/` to all of the home page routes imported from the `homeRoutes` directory
router.use('/', homeRoutes);

// Add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes); // This is the route that will be used to access the API routes

// Export the router
module.exports = router;