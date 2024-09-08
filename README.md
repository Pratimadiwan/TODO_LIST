```markdown
# To-Do List App

This is a simple To-Do List application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create, update, delete, filter and search tasks, providing a clean and efficient way to manage their daily activities.

## Features

- **Add new tasks:** Easily add new tasks to your list with a user-friendly input form.
- **Mark tasks as complete:** Check off completed tasks to keep track of your progress.
- **Delete tasks:** Remove any unwanted tasks from your list.
- **Filter tasks:** View all tasks, pending tasks, or completed tasks using the filter buttons.
- **Search tasks:** Quickly find specific tasks by typing in the search bar.
- **Progress visualization:** A progress bar and a circular progress indicator visually represent the completion status of your tasks.
- **Confetti celebration:** Enjoy a fun confetti animation when you complete all your tasks.
- **Sound effects:** Get notified with a satisfying sound effect when all tasks are completed.
- **Responsive design:** The application adapts to different screen sizes, ensuring optimal usability on desktops, tablets, and mobile devices.

## Technologies Used

**Frontend:**
- HTML: Structuring the web page.
- CSS: Styling the user interface.
- JavaScript: Handling user interactions, DOM manipulation, and making API calls to the backend.

**Backend:**
- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for storing task data.
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Functionality

### Frontend (public/app.js)

- **Fetching todos:** Retrieves the list of tasks from the backend API and dynamically renders them in the UI.
- **Adding new todos:** Sends a POST request to the API to add new tasks to the database.
- **Updating todos:** Sends a PUT request to the API to update the completion status or task content.
- **Deleting todos:** Sends a DELETE request to the API to remove tasks from the database.
- **Filtering todos:** Filters the displayed tasks based on their completion status (all, pending, done).
- **Searching todos:** Filters the displayed tasks based on the search query entered by the user.
- **Progress visualization:** Calculates and updates the progress bar and circular progress indicator based on the number of completed tasks.
- **Confetti and sound effects:** Triggers confetti animation and plays a sound effect when all tasks are marked as complete.

### Backend (server.js)

- **API endpoints:** Defines RESTful API endpoints to handle CRUD (Create, Read, Update, Delete) operations on the task data.
- **Database connection:** Connects to a MongoDB database using Mongoose.
- **Data model:** Defines a Mongoose schema to structure the task data.
- **API requests handling:** Handles incoming API requests, interacts with the database to perform the requested operations, and sends appropriate responses.

## Installation and Setup

1. **Clone the repository:** `git clone <repository-url>`
2. **Install dependencies:** 
   - Backend: `npm install` (inside the project root directory)
   - Frontend: Not applicable, as this project does not have separate frontend dependencies.
3. **Start the development server:** `npm start` (inside the project root directory)
4. **Access the application:** Open your web browser and navigate to `http://localhost:5000`

## Contributing

Feel free to fork this repository and submit pull requests with any improvements or new features. Please ensure to follow the code style and provide clear documentation for any changes.
```