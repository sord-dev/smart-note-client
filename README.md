# Next.js Front-End Application

This is a Next.js front-end application for managing and displaying notes. It consumes a backend Express server for data storage and retrieval.

## Requirements

- Node.js and npm should be installed on your machine.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`

### Installation

1. Install the dependencies: `npm install`

### Configuration

1. Create a `.env.local` file in the root directory.
2. Add the following environment variables to the `.env.local` file:
   - `NEXT_PUBLIC_API_URL` - The URL of the backend Express server.

### Development

1. Run the application in development mode: `npm run dev`
2. Open your browser and visit `http://localhost:3000` to view the application.

### Deployment

1. Build the application: `npm run build`
2. Deploy the application to a hosting platform of your choice.

## Features

- Authentication:
  - Register a new user.
  - Log in to an existing account.
  - Log out from the account.

- Dashboard:
  - View a list of notes.
  - Create a new note.
  - Edit an existing note.
  - Delete a note.
  - Filter notes by category/folder.

- Note Visualization:
  - Display notes in a visually appealing manner.
  - Support rich text formatting.

- Error Handling:
  - Display informative error messages for user actions.

- Wireframing:
  - Design and implement wireframes for the application UI using a tool of your choice (e.g., Figma, Sketch, Adobe XD).
  - Ensure the wireframes align with the desired functionality and user experience.

## Configuration (Backend Express Server)

1. Create a `.env` file in the root directory of the backend server.
2. Add the following environment variables to the `.env` file:
   - `DB_URI` - The URI of the MongoDB database.
   - `TEST_DB_URI` - The URI of the test MongoDB database.
   - `JWT_SECRET` - A secret key for JWT token generation.
   - Other necessary configuration variables for the backend server.

## Folder Structure

```bash
- src/
  - components/    # Reusable UI components
  - contexts/      # Global contexts for the application
  - pages/         # Pages or routes of the application
  - utils/         # Utility functions and helpers
  - api/           # API services for making requests to the backend server
  - styles/        # Global styles and CSS files
```

Make sure to update the paths in the README and the code accordingly.

## Technologies Used

- Next.js - A React framework for building server-rendered applications.
- React - A JavaScript library for building user interfaces.
- Axios - A promise-based HTTP client for making API requests.
- SWR - A React hook library for data fetching and caching.

## Todo List

- [x] Setup project structure
- [x] Install required dependencies
- [ ] Create authentication components
  - [x] Login form
  - [x] Registration form
  - [ ] Reset password form
- [ ] Implement authentication logic
  - [x] User registration
  - [x] User login
  - [ ] Password reset functionality
- [ ] Create dashboard page
  - [x] Display user's notes in layout
  - [x] Display user's notes on map
  - [ ] Add new note functionality
  - [ ] Edit and delete notes
- [ ] Implement note management
  - [ ] API integration for CRUD operations
  - [ ] Handle note state and updates
- [ ] Create folder and file navigation
  - [ ] Display folder structure
  - [ ] Handle folder and file selection
- [x] Add markdown rendering
  - [x] Render note content in markdown format
  - [x] Provide editing capabilities
- [ ] Styling and UI enhancements
  - [x] Apply consistent styles across components
  - [ ] Responsive design for different devices
- [ ] Testing
  - [ ] Unit tests for components and utilities
  - [ ] Integration tests for API calls
- [ ] Deployment
  - [ ] Prepare for production deployment
  - [ ] Deploy to hosting platform

Feel free to modify and expand this todo list based on the specific requirements and tasks for your project.

## Contributing

Contributions are welcome! If you have any ideas, enhancements, or bug fixes, please submit a pull request.
