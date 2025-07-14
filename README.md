# Training and Certification Tracking System - Frontend

A modern React application for managing hospital staff training and certifications with role-based access control.

## Features

- **Role-based Authentication** - Staff, Manager, and Admin roles
- **Training Management** - Schedule, assign, and track training sessions
- **Certification Tracking** - Digital records of completed training
- **Compliance Dashboard** - Real-time compliance monitoring
- **Responsive Design** - Modern UI with Tailwind CSS

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication

## User Roles

1. **Staff** - View personal training records and complete assigned training
2. **Manager** - Monitor team compliance and training progress
3. **Admin** - Full system access including user management and training creation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   copy .env.example .env
   ```

4. Update the `.env` file with your API base URL:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service functions
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## API Integration

The application integrates with the Training and Certification Tracking backend API. Key endpoints include:

- Authentication: `/api/auth/login`, `/api/auth/register`
- Users: `/api/users/profile`
- Departments: `/api/departments`
- Trainings: `/api/trainings`
- User Training: `/api/user-trainings`

## Development

### Adding New Features

1. Create components in `src/components/`
2. Add API services in `src/services/`
3. Define types in `src/types/`
4. Create Redux slices for state management in `src/store/`
5. Add new pages in `src/pages/`

### Styling

The project uses Tailwind CSS with custom utility classes defined in `src/index.css`. Key classes include:

- `.btn-primary`, `.btn-secondary`, `.btn-danger` - Button styles
- `.form-input`, `.form-label` - Form element styles
- `.card` - Card container style
- `.status-*` - Status badge styles

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new files
3. Follow the component organization pattern
4. Update types when adding new features
5. Test your changes thoroughly

## License

This project is part of the Training and Certification Tracking System.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
