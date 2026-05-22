# Blog App - Backend

This is the backend service for the Blog Application. It provides a RESTful API and handles user authentication, post management, and file uploads.

## Project Initialization

This project was initialized using npm:

```bash
mkdir backend
cd backend
npm init -y
```

Then, the required dependencies were installed.

## Dependencies and Functionalities

The following packages are used in this backend application. You can install all of them at once using `npm install`.

### Core Dependencies

*   **[express](https://www.npmjs.com/package/express)**: Fast, unopinionated, minimalist web framework for Node.js. Used to create the server and API routes.
*   **[mongoose](https://www.npmjs.com/package/mongoose)**: Elegant MongoDB object modeling for Node.js. Used to define schemas and interact with the MongoDB database.
*   **[dotenv](https://www.npmjs.com/package/dotenv)**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

### Security & Authentication

*   **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Optimized bcrypt in JavaScript with zero dependencies. Used to securely hash and compare user passwords.
*   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: An implementation of JSON Web Tokens. Used to generate and verify access tokens for authenticated routes.
*   **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Parse Cookie header and populate `req.cookies`. Used to handle JWTs securely stored in HTTP-only cookies.
*   **[cors](https://www.npmjs.com/package/cors)**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

### File Handling & Storage

*   **[multer](https://www.npmjs.com/package/multer)**: Node.js middleware for handling `multipart/form-data`. Used primarily for uploading files (like images).
*   **[cloudinary](https://www.npmjs.com/package/cloudinary)**: Cloudinary SDK. Used to seamlessly upload, manage, and store images (e.g., blog cover images or profile pictures) in the cloud.

## Installation & Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install all dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the `backend` directory and configure the necessary variables (e.g., MongoDB URI, JWT secret, Cloudinary credentials).

4.  **Start the Server:**
    ```bash
    npm start
    ```
    The server will run on the port specified in your `.env` file, or default to 5000.
