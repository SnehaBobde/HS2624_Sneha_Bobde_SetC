// Function to validate the login form
function validateLoginForm() {
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
  
    if (username === "" || password === "") {
      alert("Please fill in all fields.");
      return false;
    }
  
    // Additional validation logic if needed
  
    return true;
  }
  
  // Function to validate the registration form
  function validateRegistrationForm() {
    var username = document.forms["registrationForm"]["username"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
  
    if (username === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields.");
      return false;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
  
    // Additional validation logic if needed
  
    return true;
  }
  
  // Event listener for form submission
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateLoginForm()) {
      // Submit the form or perform further actions
    }
  });
  
  document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateRegistrationForm()) {
      // Submit the form or perform further actions
    }
  });
  // Get the video ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');

// Retrieve the video information based on the video ID (e.g., from an array or API)
const videoInfo = getVideoInfoById(videoId); // Implement your logic to fetch the video information

// Update the video player page with the retrieved information
document.getElementById('videoSource').src = videoInfo.videoUrl;
document.getElementById('videoTitle').textContent = videoInfo.title;
document.getElementById('videoDuration').textContent = `Duration: ${videoInfo.duration}`;

// Update the video player's controls
const video = document.getElementById('video');
video.load(); // Reload the video element to update the source

// Play the video automatically
video.play();

// Like and dislike functionality
const likeButton = document.getElementById('likeButton');
const dislikeButton = document.getElementById('dislikeButton');

likeButton.addEventListener('click', () => {
  // Implement your logic to handle liking a video
  // Example: increment the like count and update the UI
  // You can store the like count in a variable or update it on the server
});

dislikeButton.addEventListener('click', () => {
  // Implement your logic to handle disliking a video
  // Example: increment the dislike count and update the UI
  // You can store the dislike count in a variable or update it on the server
});

// Comment functionality
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const comment = commentInput.value.trim();
  
  if (comment !== '') {
    // Implement your logic to handle submitting a comment
    // Example: create a new comment object, add it to the comment list, and update the UI
    // You can store the comments in an array or save them on the server
    
    const commentItem = document.createElement('li');
    commentItem.textContent = comment;
    commentList.appendChild(commentItem);
    
    commentInput.value = ''; // Clear the comment input field
  }
});


  