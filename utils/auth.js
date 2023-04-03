// This file is used to check if a user is logged in before allowing them to access certain routes
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
    // If the user is logged in, execute the route function that will allow them to view the page
  } else {
    next();
  }
};

// Export the withAuth function
module.exports = withAuth;