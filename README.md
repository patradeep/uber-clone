# Uber Clone

This project is a clone of the Uber application, providing functionalities for users to request rides and for captains (drivers) to accept and manage those rides. The application is built using a Node.js backend with Express and MongoDB, and a React frontend.


**Live Website:**
- [Netlify Link](https://chipper-monstera-a0011c.netlify.app/)

  
## Features

- User registration and login
- Captain registration and login
- Real-time ride requests using Socket.IO
- Geolocation tracking for users and captains
- Fare estimation based on pickup and drop-off locations
- Ride management for captains (accept, start, complete rides)

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Socket.IO
- **Authentication**: JSON Web Tokens (JWT)
- **Geolocation**: Google Maps API

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google Maps API key

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uber-clone.git
   cd uber-clone/Backend
