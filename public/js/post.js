// retrieves the HTML element with the id of delete-btn
const deleteButton = document.getElementById("delete-btn");

// retrieves the HTML element with the id of post-id
const postId = document.getElementById("post-id");
console.log(postId.value); // logs the value of the post-id element

// creates a new form handler
const newFormHandler = async (event) => {
  event.preventDefault();

  // checks if the post id is not empty
  if (postId.value) {
    const response = await fetch(`/api/posts/${postId.value}`, {
      method: 'DELETE',
    });

    // check if the request went through
    if (response.ok) {
      document.location.replace('/api/users/posts');
      // if the request failed
    } else {
      alert('Failed to delete post');
    }
  }
};

// adds the event listener to the delete button
deleteButton.addEventListener("click", newFormHandler);