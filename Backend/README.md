### API Documentation

#### User Routes

- **POST /users/register**
  - Description: Register a new user.
  - Parameters:
    - `name.firstname`: String, required, minimum length 3 characters.
    - `email`: String, required, must be a valid email.
    - `password`: String, required, minimum length 6 characters.
  - Response: JSON object containing user information and authentication token.

- **POST /users/login**
  - Description: Login a user.
  - Parameters:
    - `email`: String, required, must be a valid email.
    - `password`: String, required, minimum length 6 characters.
  - Response: JSON object containing user information and authentication token.

- **GET /users/profile**
  - Description: Get the profile of the logged-in user.
  - Response: JSON object containing user information.

- **GET /users/logout**
  - Description: Logout the user.
  - Response: JSON object with a logout message.

#### Captain Routes

- **POST /captains/register**
  - Description: Register a new captain.
  - Parameters:
    - `name.firstname`: String, required, minimum length 3 characters.
    - `email`: String, required, must be a valid email.
    - `password`: String, required, minimum length 6 characters.
    - `vehicle.color`: String, required, minimum length 3 characters.
    - `vehicle.plate`: String, required, minimum length 6 characters.
    - `vehicle.capacity`: Integer, required, minimum value 1.
    - `vehicle.type`: String, required, must be one of ['car', 'motorcycle', 'auto'].
  - Response: JSON object containing captain information and authentication token.

- **POST /captains/login**
  - Description: Login a captain.
  - Parameters:
    - `email`: String, required, must be a valid email.
    - `password`: String, required, minimum length 6 characters.
  - Response: JSON object containing captain information and authentication token.

- **GET /captains/profile**
  - Description: Get the profile of the logged-in captain.
  - Response: JSON object containing captain information.

- **GET /captains/logout**
  - Description: Logout the captain.
  - Response: JSON object with a logout message.

#### Maps Routes

- **GET /maps/get-cordinates**
  - Description: Get coordinates for a given address.
  - Parameters:
    - `address`: String, required, minimum length 3 characters.
  - Response: JSON object containing coordinates.

- **GET /maps/get-distance-time**
  - Description: Get distance and time between two locations.
  - Parameters:
    - `origin`: String, required, minimum length 3 characters.
    - `destination`: String, required, minimum length 3 characters.
  - Response: JSON object containing distance and time information.

- **GET /maps/get-suggestion**
  - Description: Get address suggestions based on a query.
  - Parameters:
    - `address`: String, required, minimum length 3 characters.
  - Response: JSON object containing address suggestions.

#### Ride Routes

- **POST /rides/create**
  - Description: Create a new ride.
  - Parameters:
    - `picup`: String, required, minimum length 3 characters.
    - `dropoff`: String, required, minimum length 3 characters.
    - `vehicle`: String, required, must be one of ['car', 'auto', 'moto'].
  - Response: JSON object containing ride information.

- **GET /rides/get_fare**
  - Description: Get fare estimate for a ride.
  - Parameters:
    - `picup`: String, required, minimum length 3 characters.
    - `dropoff`: String, required, minimum length 3 characters.
  - Response: JSON object containing fare estimate.

- **POST /rides/confirm**
  - Description: Confirm a ride.
  - Parameters:
    - `rideId`: String, required, must be a valid ride ID.
  - Response: JSON object containing confirmed ride information.

- **GET /rides/start_ride**
  - Description: Start a ride.
  - Parameters:
    - `rideId`: String, required, must be a valid ride ID.
    - `otp`: String, required, minimum length 6 characters.
  - Response: JSON object containing started ride information.

- **POST /rides/complete_ride**
  - Description: Complete a ride.
  - Parameters:
    - `rideId`: String, required, must be a valid ride ID.
  - Response: JSON object containing completed ride information.
