# Authentication Server - README

A simple authentication server built using Express.js and PostgreSQL. The server provides authentication functionality with JWT for securing protected endpoints.

## Getting Started

### Prerequisites

- Node.js (version 18.16.x)
- PostgreSQL (version 14)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-authentication-server.git
    cd your-authentication-server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a PostgreSQL database and update the database configuration in src/config.js.

    Initialize the database and add a test user:
    Manually add a test user to the database table users with a hashed password.

    ```sql
    CREATE DATABASE express_auth_task;

    \c express_auth_task;

    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
    );

    INSERT INTO users (name, password) VALUES (‘Mykyta ‘Vitkvosky,’$2b$10$ACRsQikf.Y26LBKoZfrKj.6Xv2nfPi0HTPHvZ0FCbON/dsJtqV9IO');
    ```

    Hash password is ***hello***

4. Start the server:

    ```bash
    npm start
    ```

### Testing

#### Postman Collection
A Postman collection is provided to simplify testing. You can import the collection into Postman to access pre-configured requests for the authentication endpoints.

#### Endpoints

##### Login: POST /login

Use this endpoint to log in and obtain a JWT token.
Provide the name and password as JSON in the request body.
A successful login will return a JWT token.

##### Protected: GET /protected

This is a protected endpoint that requires authentication.
Include the JWT token in the Authorization header as Bearer <token> to access the endpoint.
Without a valid token, the endpoint returns an error.