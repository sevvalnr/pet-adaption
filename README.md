# Pet Adoption Platform

A full-stack web application that connects people with pets available for adoption. Users can browse available pets by category, add pets for adoption, and manage their profiles.

## Project Overview

This is a monorepo containing:
- **Frontend**: React-based single-page application for browsing and managing pet adoptions
- **Backend**: Go/Fiber API server for handling authentication and pet data management
- **Database**: MongoDB for persistent data storage

## Features

- **User Authentication**: Sign up, login, and profile management with JWT tokens
- **Pet Browsing**: View available pets by category (Dogs, Cats, Birds, Other)
- **Add Pets**: Users can list their pets for adoption
- **Adopt Pets**: Browse and adopt available pets with detailed pet information
- **User Profiles**: Manage user information and adoption history
- **Responsive Design**: Mobile-friendly UI with Material-UI components

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit & React-Redux** - State management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Material-UI Icons** - Icon library
- **CSS** - Styling

### Backend
- **Go 1.22** - Backend language
- **Fiber v2** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication

## Getting Started

### Prerequisites
- Node.js and npm (for frontend)
- Go 1.22+ (for backend)
- MongoDB instance running

### Frontend Setup

1. Navigate to the `pet` directory:
   ```bash
   cd pet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install Go dependencies:
   ```bash
   go mod download
   ```

3. Run the backend server:
   ```bash
   go run main.go
   ```

The API will be available at `http://localhost:3001` (or configured port)

## Available Scripts

### Frontend (`pet` directory)

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Backend (`backend` directory)

- `go run main.go` - Runs the server
- `go build` - Builds the executable
- `go test` - Runs tests

## Project Structure

```
pet-adaption/
├── pet/                          # Frontend (React)
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Home.js
│   │   │   ├── Pets.js
│   │   │   ├── LogIn.js
│   │   │   ├── SignUp.js
│   │   │   ├── Profile.js
│   │   │   ├── Navbar.js
│   │   │   ├── AddPet/          # Pet addition components
│   │   │   ├── Adopt/           # Pet adoption components
│   │   │   ├── action/          # Redux actions
│   │   │   ├── reducer/         # Redux reducers
│   │   │   ├── api/             # API integration
│   │   │   └── styles/          # CSS styles
│   │   ├── App.js
│   │   ├── index.js
│   │   └── store.js             # Redux store configuration
│   ├── public/
│   └── package.json
│
└── backend/                      # Backend (Go)
    ├── main.go
    └── go.mod
```

## API Integration

The frontend communicates with the backend API for:
- User authentication (login/signup)
- Fetching pet listings
- Creating new pet listings
- Managing user profiles

API endpoints are configured in `pet/src/components/api/index.js`

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored using `js-cookie`
- User data is managed via Redux store
- Protected routes require valid authentication

## Styling

- Component-specific styles are located in `pet/src/components/styles/`
- Material-UI components for icons and UI elements
- Responsive CSS for mobile and desktop layouts

## Deployment

### Frontend
Run `npm run build` in the `pet` directory to create an optimized production build.

### Backend
Build the Go binary with `go build` and deploy to your server.

## Contributing

1. Create a feature branch from main
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the pet adoption initiative.

## Support

For issues or questions, please contact
