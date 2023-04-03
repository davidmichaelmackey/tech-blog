// This file contains the code to log out a user

const logout = async () => {
  // send a POST request to the logout route
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // check if the request went through
  if (response.ok) {
    document.location.replace('/');
    // if the request failed
  } else {
    alert('Failed to log out.');
  }
};

// add the event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);