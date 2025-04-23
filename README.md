# Smart Todo List Frontend

A modern, accessible React frontend for a Smart Todo List application, built with Vite, React, and Tailwind CSS.

## Features

- Create tasks with title, description, and deadline
- View tasks in three categories: Ongoing, Completed, and Overdue
- Real-time countdown timers for task deadlines
- Mark tasks as complete/incomplete
- Delete tasks
- Responsive design for mobile and desktop
- Fully accessible UI with ARIA attributes

## Tech Stack

- **React**: Modern UI library
- **Vite**: Fast development and production builds
- **Tailwind CSS**: Utility-first styling
- **Custom Hooks**: For task management
- **Date Utilities**: For consistent date formatting

## Project Structure

```
src/
  ├── components/           # UI Components
  │   ├── TaskForm.jsx      # Form for creating new tasks
  │   ├── TaskList.jsx      # List of tasks for each category
  │   ├── TaskCard.jsx      # Individual task card
  │   └── BucketTabs.jsx    # Tabs for switching between categories
  ├── hooks/
  │   └── useTasks.js       # Custom hook for task management
  ├── services/
  │   └── taskService.js    # API service for tasks
  ├── utils/
  │   └── dateUtils.js      # Utilities for date formatting
  ├── App.jsx               # Main application component
  └── main.jsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your API URL:

```
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

The frontend connects to a RESTful backend with the following endpoints:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task status
- `DELETE /tasks/:id` - Delete a task

## Key Features

### Task Management

- **Create Tasks**: Add tasks with validation for required fields
- **View Tasks**: See tasks organized by status (Ongoing, Completed, Overdue)
- **Update Tasks**: Mark tasks as complete or incomplete
- **Delete Tasks**: Remove tasks with confirmation

### User Experience

- **Real-time Countdowns**: See how much time is left before deadlines
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Status Indicators**: Visual cues for task status with color-coding
- **Form Validation**: Client-side validation with helpful error messages
- **Success Feedback**: Clear success messages after actions
- **Loading States**: Loading indicators during API operations

### Accessibility

- ARIA attributes for better screen reader support
- Semantic HTML structure
- Keyboard navigation support
- Focus management
- Proper error and success messaging

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Future Enhancements

- Task sorting and filtering options
- Task priority levels
- Recurring tasks
- Tags/categories for tasks
- Dark mode support
