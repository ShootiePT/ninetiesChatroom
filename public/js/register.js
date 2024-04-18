

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
      registerUser(username, password);
  });
});

// Function to handle the login (this could be an AJAX call or fetch request)
function registerUser(username, password) {
  console.log('Attempting to register with', username, password);
  fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Registration failed with status: ' + response.status);
      }
      return response.json();
  })
  .then(data => {
      console.log('Registration successful:', data);
      window.location.href = '/index2.html';  // Redirect to a new page upon successful login
  })
  .catch(error => {
      console.error('Registration failed:', error);
      alert('Failed to register. That username might already be taken. Change it and try again.');
  });
}