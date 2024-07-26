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
  const userId = getuserId();
  try {
    const response = await fetch(`${BASE_URL}/parcels/getAgentParcels/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await response.json();

    if (response.ok) {
      const parcelsDiv = document.querySelector('#parcels');
      parcelsDiv.innerHTML = '<h3>Your Parcels</h3>';
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

      document.querySelector('#updateParcelForm').style.display = 'block';
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// Form Submissions
const handleUpdateParcelStatus = async (event) => {
  event.preventDefault();
  redirectToLogin();
  const trackingNumber = document.querySelector('#trackingNumberUpdate').value;
  const status = document.querySelector('#status').value;

  try {
    const response = await fetch(`${BASE_URL}/parcels/updateStatus/${trackingNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Parcel status updated successfully.');
      fetchParcels();
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('Server error, please try again later.');
  }
};

// Event Listeners
document.querySelector('#updateParcelForm')?.addEventListener('submit', handleUpdateParcelStatus);
document.querySelector('#logout')?.addEventListener('click', (event) => {
  event.preventDefault();
  removeToken();
  window.location.href = 'login.html';
});

// Initialize
fetchParcels();
