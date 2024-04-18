

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent the default form submission

      const username = document.getElementById('exampleFormControlInput1').value;
      const password = document.getElementById('exampleFormControlInput11').value;

      if (!username || !password) {
          alert('Please fill in both username and password.');
          return;  // Stop the function if credentials are missing
      }

      // Proceed with form submission, such as an AJAX call or fetch
      loginUser(username, password);
  });
});

// Function to handle the login (this could be an AJAX call or fetch request)
function loginUser(username, password) {
  console.log('Attempting to log in with', username, password);
  fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Login failed with status: ' + response.status);
      }
      return response.json();
  })
  .then(data => {
      console.log('Login successful:', data);
      window.location.href = '/index2.html';  // Redirect to a new page upon successful login
  })
  .catch(error => {
      console.error('Login failed:', error);
      alert('Failed to login. Please check your credentials and try again.');
  });
}