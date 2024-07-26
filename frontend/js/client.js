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
const fetchDeliveryAgents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/getAgents`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const deliveryAgents = await response.json();

    if (response.ok) {
      const deliveryAgentSelect = document.querySelector("#deliveryAgent");
      deliveryAgentSelect.innerHTML = '';
      deliveryAgents.forEach((agent) => {
        const option = document.createElement("option");
        option.value = agent._id;
        option.textContent = agent.name;
        deliveryAgentSelect.appendChild(option);
      });
    } else {
      showError('Failed to fetch delivery agents.');
    }
  } catch (error) {
    showError("Server error, please try again later.");
  }
};

const fetchParcels = async () => {
  redirectToLogin();
  const userId = getuserId();
  try {
    const response = await fetch(`${BASE_URL}/parcels/getClientParcels/${userId}`, {
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

      document.querySelector('#createParcelForm').style.display = 'block';
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// Form Submissions
const handleCreateParcel = async (event) => {
  event.preventDefault();
  const trackingNumber = document.querySelector('#trackingNumber').value;
  const deliveryAgent = document.querySelector('#deliveryAgent').value;

  try {
    const response = await fetch(`${BASE_URL}/parcels/createParcel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ trackingNumber, deliveryAgent }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Parcel created successfully.');
      fetchParcels();
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('Server error, please try again later.');
  }
};

// Event Listeners
document.querySelector('#createParcelForm')?.addEventListener('submit', handleCreateParcel);
document.querySelector('#logout')?.addEventListener('click', (event) => {
  event.preventDefault();
  removeToken();
  window.location.href = 'login.html';
});

// Initialize
fetchParcels();
fetchDeliveryAgents();
