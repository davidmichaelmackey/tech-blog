// test to see if the file is linked
console.log("Hello world!");

// get the elements from the DOM
const title = document.getElementById("post-title");

// get the description element
const description = document.getElementById("post-description");

// get the submit button
const submitButton = document.getElementById("submit-button");

// create a new form handler
const newFormHandler = async (event) => {
  event.preventDefault();

  // get the values from the form
  const postTitle = title.value;
  const postDescription = description.value;

  // check if the title and description are not empty
  if (title.value && description.value) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        description: postDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // check if the request went through
    if (response.ok) {
      console.log("Request successful!");
      document.location.replace("/api/users/posts");
      // if the request failed
    } else {
      console.log("Request failed. :(");
    }
  }
};

// add the event listener to the submit button
submitButton.addEventListener("click", newFormHandler);