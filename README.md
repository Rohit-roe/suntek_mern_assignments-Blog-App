# Blog Management System

**Demo Link:** [https://suntek-mern-assignments-blog-app.vercel.app](https://suntek-mern-assignments-blog-app.vercel.app)

A robust, multi-role Blog Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). This application features secure authentication, role-based access control, and seamless media management for high-quality content creation.

Key Features
Multi-Role Access Control: Specialized dashboards for Users, Authors, and Admins.

Article Management: Authors can create, edit, and manage their blog posts with a feature-rich editor.

Engagement: Users can read articles and leave comments.

Secure Authentication: JWT-based secure login and registration with hashed passwords.

Media Integration: Profile and article image uploads powered by Cloudinary and Multer.

Responsive UI: Fully responsive frontend built with React and styled for all screen sizes.

Tech Stack
Frontend: React, Vite, CSS

Backend: Node.js, Express.js

Database: MongoDB

State Management: Context API (authStore)

File Uploads: Multer & Cloudinary

Security: JSON Web Token (JWT), bcryptjs

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16.x or higher)

MongoDB (Local instance or Atlas URI)

A Cloudinary account for image storage.

Installation & Setup
Clone the Repository
Navigate to your desired folder and clone the project.

Backend Configuration
a. Open a terminal and navigate to the backend directory:
cd backend
b. Install dependencies:
npm install
c. Create a .env file in the backend folder and add the following:
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Frontend Configuration
a. Open a new terminal and navigate to the frontend directory:
cd frontend
b. Install dependencies:
npm install

Running the Application
Start the Backend:
In the backend terminal, run:
npm start
The server will start on http://localhost:4000.

Start the Frontend:
In the frontend terminal, run:
npm run dev
The app will be available at http://localhost:5173.

Project Structure
backend/

apis/: Express routes (Admin, Author, User, Common)

config/: Cloudinary & Multer configuration

middleware/: Auth & Role-based verification

models/: MongoDB Schemas (User, Article)

server.js: Entry point
frontend/

src/components/: Dashboards, Auth, Article UI components

src/store/: authStore for global state

src/styles/: Common JS-based styling

App.jsx: Client-side routing