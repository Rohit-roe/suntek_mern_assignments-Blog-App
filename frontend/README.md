# Blog App - Frontend

This is the frontend client for the Blog Application, built with React, Vite, and Tailwind CSS. It provides a dynamic and responsive user interface for reading, writing, and managing blog posts.

## Project Initialization

This project was initialized using Vite's React template to provide a fast and modern development experience:

```bash
npm create vite@latest frontend -- --template react
cd frontend
```

## Dependencies and Functionalities

The following packages are used in this frontend application to manage UI, state, routing, and styling.

### Core Framework & Routing

*   **[react](https://www.npmjs.com/package/react) & [react-dom](https://www.npmjs.com/package/react-dom)**: The core libraries for building the component-based user interface.
*   **[react-router](https://www.npmjs.com/package/react-router)**: Declarative routing library for React to handle seamless client-side navigation between different pages (Home, Profile, Create Post, etc.).

### Styling & UI Enhancements

*   **[tailwindcss](https://tailwindcss.com/) & [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite)**: A utility-first CSS framework for rapidly building custom user interfaces directly in the markup.
*   **[clsx](https://www.npmjs.com/package/clsx) & [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)**: Utility libraries used together to dynamically construct CSS class strings and smartly merge Tailwind classes without styling conflicts.
*   **[framer-motion](https://www.npmjs.com/package/framer-motion)**: A production-ready motion library for React. Used to add smooth animations and transitions to UI elements.
*   **[lucide-react](https://lucide.dev/)**: A collection of beautiful, consistent, and customizable SVG icons for React.
*   **[react-hot-toast](https://react-hot-toast.com/)**: A lightweight library for adding beautiful toast notifications to inform the user of successes, errors, and background processes.

### State Management, Data Fetching & Forms

*   **[zustand](https://github.com/pmndrs/zustand)**: A small, fast, and scalable bearbones state-management solution used for managing global application state (like authenticated user info).
*   **[axios](https://axios-http.com/)**: A promise-based HTTP client for the browser. Used to make API requests to the backend server.
*   **[react-hook-form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation. Used to manage form state efficiently (e.g., login, registration, and post creation).

## Installation & Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install all dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually accessible at `http://localhost:5173`.
