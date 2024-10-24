# Todo App - Backend

This is the **backend** for the Todo application, hosted on Render.

## Features

- RESTful API for managing tasks.
- Create, read, update, and delete (CRUD) functionality for tasks.

## Tech Stack

- **Node.js** with **Express**
- **MongoDB**
- **Hosted on**: [Render](https://render.com)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or other database.

### Steps

1. Clone the repository as mentioned in README.md for the whole repository and run the following commands
   ```bash
   cd todo-mern
   cd server
   

2. Install dependencies:
   ```bash
   npm install
3. Start the server
   ```bash
   node server.js

## Environment Variables
  - Make sure to create a .env file in the root of the project with the following variables:
    ```bash
    MONGO_URI=your_mongo_db_connection_string
    PORT=your_desired_port

## Usage
   - The API will be accessible at http://localhost:your_port by default.
   - Use tools like Postman to test the endpoints.
     
## Contributing
   - Contributions are welcome! Feel free to open a pull request or issue.

## License
  - This project is licensed under the MIT License.
