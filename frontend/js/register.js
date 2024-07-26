// Base URL for API requests
const BASE_URL = '/api';

// Utility Functions
const showError = (message) => {
  alert(message);
};

// Form Submissions
const handleRegister = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const role = document.querySelector('#role').value;

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful. You can now log in.');
      window.location.href = 'login.html';
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('Server error, please try again later.');
  }
};

// Event Listeners
document.querySelector('#registerForm')?.addEventListener('submit', handleRegister);
