// Base URL for API requests
const BASE_URL = '/api';

// Helper functions for local storage management
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const getRole = () => localStorage.getItem('role');
const setRole = (role) => localStorage.setItem('role', role);
const getuserId = () => localStorage.getItem('userId');
const setuserId = (userId) => localStorage.setItem('userId', userId);
const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

// Utility Functions
const showError = (message) => {
  alert(message);
};

const redirectToLogin = () => {
  if (!getToken()) {
    window.location.href = 'login.html';
  }
};

// Data Fetchers
const fetchParcels = async () => {
  redirectToLogin();
  try {
    const response = await fetch(`${BASE_URL}/parcels/getParcels`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await response.json();

    if (response.ok) {
      const parcelsDiv = document.querySelector('#parcels');
      parcelsDiv.innerHTML = '<h3>All Parcels</h3>';
      data.forEach((parcel) => {
        const parcelDiv = document.createElement('div');
        parcelDiv.innerHTML = `
          <p>Tracking Number: ${parcel.trackingNumber}</p>
          <p>Status: ${parcel.status}</p>
          <p>Client: ${parcel.client.name}</p>
          <p>Delivery Agent: ${parcel.deliveryAgent ? parcel.deliveryAgent.name : 'Not Assigned'}</p>
          <hr>
        `;
        parcelsDiv.appendChild(parcelDiv);
      });

      fetchUsers();
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/getUsers`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await response.json();

    if (response.ok) {
      const usersDiv = document.querySelector('#users');
      usersDiv.innerHTML = '<h3>Users</h3>';
      data.forEach((user) => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <p>ID: ${user._id}</p>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
          <p>Role: ${user.role}</p>
          <hr>
        `;
        usersDiv.appendChild(userDiv);
      });
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// Event Listeners
document.querySelector('#logout')?.addEventListener('click', (event) => {
  event.preventDefault();
  removeToken();
  window.location.href = 'login.html';
});

// Initialize
fetchParcels();
