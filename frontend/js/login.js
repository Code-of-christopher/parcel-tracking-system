// Base URL for API requests
const BASE_URL = '/api';

// Helper functions for local storage management
const setToken = (token) => localStorage.setItem('token', token);
const setRole = (role) => localStorage.setItem('role', role);
const setuserId = (userId) => localStorage.setItem('userId', userId);

// Utility Functions
const showError = (message) => {
  alert(message);
};

// Form Submissions
const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setRole(data.role);
      setuserId(data.userId);

      switch (data.role) {
        case 'client':
          window.location.href = 'client.html';
          break;
        case 'deliveryAgent':
          window.location.href = 'agent.html';
          break;
        case 'admin':
          window.location.href = 'admin.html';
          break;
        default:
          showError('Unknown role, please contact support.');
      }
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('Server error, please try again later.');
  }
};

// Event Listeners
document.querySelector('#loginForm')?.addEventListener('submit', handleLogin);
