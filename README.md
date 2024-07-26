# Parcel Tracking System

## Description
An online parcel tracking system that allows clients to monitor their parcel progress from dispatch to the intended delivery location. Includes features for administrators, clients, and delivery agents.

## Installation

1. Clone the repository:
   `git clone <repo_url>`

2. Navigate to the backend directory and install dependencies:
   `cd parcel-tracking-system/backend`
   `npm install`

3. Start the server:
   `npm run dev`

4. Serve the frontend files using a static file server or integrate with the backend.

## Frontend
- HTML, CSS, and JavaScript files are located in the `frontend` directory.

## Backend
- Node.js and Express server
- MongoDB for database

## API Endpoints

- **Authentication**
  - POST /api/auth/register
  - POST /api/auth/login

- **Users**
  - GET /api/users
  - GET /api/users/:id
  - PUT /api/users/:id

- **Parcels**
  - POST /api/parcels
  - GET /api/parcels
  - GET /api/parcels/:trackingNumber
  - PUT /api/parcels/:trackingNumber
