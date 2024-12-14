# SundaeSocialAPI

## Description

This project is a Social Network API built from scratch for a web application where users can share their thoughts, react to friends' thoughts, and create a friend list. The application uses MongoDB, a NoSQL database, to handle large amounts of unstructured data efficiently. The API is built with Node.js and Express.js, with Mongoose as the ODM (Object Data Modeling) library for MongoDB.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation

1. **Clone the repository:**
   git clone https://github.com/UnknownKonflikt/SundaeSocialAPI.git
   
   cd SundaeSocialAPI

2. **Install dependencies:**
   npm install
  

3. **Set up the MongoDB connection:**
   Make sure MongoDB is installed and running on your machine. You can configure the connection string in `config/connection.js`.

## Usage

1. **Start the server:**

   node server.js


2. **Test API endpoints:**
   Use a tool like [Insomnia](https://insomnia.rest/) to test the API endpoints.

## API Routes

### User Routes

- **GET /api/users**
  - Get all users

- **GET /api/users/:id**
  - Get a single user by ID

- **POST /api/users**
  - Create a new user

- **PUT /api/users/:id**
  - Update a user by ID

- **DELETE /api/users/:id**
  - Delete a user by ID

### Thought Routes

- **GET /api/thoughts**
  - Get all thoughts

- **GET /api/thoughts/:id**
  - Get a single thought by ID

- **POST /api/thoughts**
  - Create a new thought

- **PUT /api/thoughts/:id**
  - Update a thought by ID

- **DELETE /api/thoughts/:id**
  - Delete a thought by ID

### Reaction Routes

- **POST /api/thoughts/:thoughtId/reactions**
  - Create a reaction to a thought

- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**
  - Delete a reaction by ID

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Day.js** (for date formatting)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and is well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Questions

If you have any questions about the project or want to get in touch, you can reach me at:
- GitHub: https://github.com/UnknownKonflikt
- Email: unkownkonflikt@gmail.com

