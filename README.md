# Mini Project Elevarm Test

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)

## About

This project consists of the User Module, Food Services Module, and Ride Services Module.

## Built With
    - Typescript
    - Express

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/septianmy/elevarm-test.git

2. **Install the dependencies:**
    ```bash
    cd elevarm-test
    npm install

3. **Setup PostgreSQL:**
    - Make sure you have PostgreSQL installed on your machine. If not, download and install it from PostgreSQL Downloads.

    - Create a new database for the project using the PostgreSQL command line or a GUI tool like pgAdmin.

    - Restore the database from the SQL dump file (elevarm_test.sql)

    - Copy the .env.example file to .env and fill in the PostgreSQL connection details:
        ```bash
            DB_HOST=localhost
            DB_PORT=5432
            DB_USER=your_username
            DB_PASSWORD=your_password
            DB_NAME=your_database_name


## Usage

1. **Build TypeScript files::**
   ```bash
    npm run build

2. **Start the server:**
    ```bash
    npm start

## Development
1. **Start the server in development mode:**
    ```bash
    npm run start:dev




