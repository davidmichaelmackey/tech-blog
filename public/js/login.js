// get the login form
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default browser behavior

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/api/users/posts");
    } else {
      alert(response.statusText);
    }
  }
};

// get the signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Send a POST request to the API endpoint
  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // check the response status and redirect the user to the profile page
    if (response.ok) {
      document.location.replace("/api/users/posts");
      // if the request failed
    } else {
      alert(response.statusText);
    }
  }
};

// add the event listeners to the forms
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);

// add the event listener to the signup form
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);