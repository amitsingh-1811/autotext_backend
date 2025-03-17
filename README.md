# Backend Math Operations API

## Overview

This project is a backend API built with **Node.js** and **Express** for performing various mathematical operations. It supports operations such as **addition**, **multiplication**, **factorial calculation**, and generating the **Fibonacci series**. Each operation is validated through custom middleware and then processed by dedicated controllers. The results are stored in a database via **Prisma ORM** for logging and later retrieval.

## Features

- **Addition**: Adds two numbers.
- **Multiplication**: Multiplies two numbers.
- **Factorial**: Calculates the factorial of a given number.
- **Fibonacci**: Generates a Fibonacci series based on the provided count.
- **Operation Logging**: Every operation is stored in the database.
- **CRUD Operations**: Retrieve, update, and delete recorded operations.
- **Robust Error Handling**: Custom error handling to ensure clear and consistent API responses.
- **Automated Testing**: Tests for middleware and controllers are implemented using Jest.

## Technology Stack

- **Node.js** – JavaScript runtime environment
- **Express** – Web framework for Node.js
- **Prisma** – ORM for database interactions
- **Jest** – Testing framework for JavaScript
- **Babel** – For transpiling modern JavaScript code
- **dotenv** – Environment variable management

## Prerequisites

- **Node.js** (v12 or above)
- **npm** (comes with Node.js)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a .env file in the root directory of the project (this file is ignored by Git) and add the following variables:
   ```bash
   PORT=3000
   DATABASE_URL="your_database_connection_string"
   ```
  Replace "your_database_connection_string" with your actual database connection string. For example, if you are using SQLite, your configuration might look like:
  ```bash
  DATABASE_URL="file:./dev.db"
  ```
4. **Database Setup with Prisma**
   The project uses Prisma for managing database migrations. Initialize and migrate your database by running:
   ```bash
   npx prisma migrate dev --name init

This command will apply the migrations defined in prisma/schema.prisma and generate the database file (e.g., dev.db).

5. **Run the server**
  ```bash
  npm start
  ```
The server will listen on the port specified in your .env file (e.g., http://localhost:3000).

6. **Running tests**
   ```bash
   npm test
   ```
## API endpoints
  The API base URL is /api. Below are the available endpoints:
  - **POST /api/addTwoNumber**
    Description: Adds two numbers.
    - **Body parameters:**  
      - `operand1` (number)  
      - `operand2` (number)  
      - `operation` (string, must be `"multiplication"`) 

 - **POST /api/getFactorial**
   Description: Calculates the factorial of a number.
   - **Body parameters:**
     - `operand`(number)
     - operation (string, must be "factorial")

- **POST /api/getFibonacci**
  Description: Generates a Fibonacci series.
  - **Body Parameters:**
     - `count` (integer)
     - `operation` (string, must be "fibonacci")

  - **GET /api/getAllOperations**
    Description: Retrieves all operations stored in the database.

  - **DELETE /api/deleteOperation**
    Description: Deletes a specific operation.
    - **Headers:**
      - `id` (string, operation ID to delete)

  - **PUT /api/updateOperation**
    Description: Updates an existing operation.

## Project Structure
  ```bash
  ├── __test__                    # Test files (middleware.test.js, controller.test.js)
  ├── config
  │   └── database.js             # Database configuration
  ├── controller
  │   └── operationsController.js # Controller functions for math operations
  ├── errorHandler
  │   └── errorHandler.js         # Custom error handling logic
  ├── middleware
  │   └── middleware.js           # Middleware for input validation and processing
  ├── prisma
  │   ├── migrations              # Prisma migration files
  │   ├── dev.db                  # SQLite database file (auto-generated)
  │   └── schema.prisma           # Prisma schema definition
  ├── routes
  │   └── operationsRoute.js      # API route definitions
  ├── app.js                      # Express app configuration
  ├── server.js                   # Server entry point
  ├── babel.config.cjs            # Babel configuration
  ├── jest.config.js              # Jest configuration
  ├── package.json                # NPM configuration and scripts
  └── package-lock.json           # NPM dependency lock file
  ```


        
