
# TimeScribe

TimeScribe is a web application that automates time tracking by integrating with tools like Jira, BitBucket, and calendar systems to generate accurate time logs with rich, automatically generated descriptions.

## Features

- **Jira Integration**: Connect directly to your Jira projects to import tasks, issues, and time logs.
- **Git Sync**: Pull information from your commits to enhance time log details.
- **Calendar Integration**: Import meetings and events from your calendar to track discussion time.
- **Time Tracking**: Accurate tracking of time spent on tasks with minimal manual input required.
- **PDF Reports**: Generate and download PDF reports of your time logs for weekly or monthly periods.
- **Automatic Descriptions**: Generate detailed descriptions from Jira comments, git commits, and more.

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation
- React Query for data fetching
- PDF generation with jsPDF

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Navigate to http://localhost:8080 to see the application

## Project Structure

- `/src/components`: React components organized by function
- `/src/pages`: Page-level components representing different routes
- `/src/services`: Service modules that handle external API interactions
- `/src/contexts`: React contexts for state management
- `/src/hooks`: Custom React hooks

## Authentication

The application includes authentication functionality with login and registration pages. Users need to authenticate to access their time tracking data.

## Development

This project is built with Vite for fast development and optimized production builds. The codebase follows a component-based architecture with a focus on reusability and maintainability.
