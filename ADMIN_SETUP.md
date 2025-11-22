# Admin Panel Setup

This React application now includes a complete admin panel with Firebase authentication.

## Features

- **Admin Panel URL**: `/admin`
- **Authentication**: Firebase Email/Password
- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Modern UI**: Built with Tailwind CSS and Framer Motion
- **Responsive Design**: Works on desktop and mobile devices

## File Structure

```
src/
├── contexts/
│   └── AuthContext.js          # Firebase authentication context
├── components/
│   └── ProtectedRoute.js       # Route protection component
├── pages/
│   ├── AdminLogin.js           # Sign in/Sign up page
│   ├── AdminDashboard.js       # Admin dashboard template
│   └── AdminRoutes.js          # Admin routing configuration
├── firebase.js                 # Firebase configuration
└── App.js                      # Main app with routing
```

## How to Access

1. Navigate to `http://localhost:3000/admin`
2. If not logged in, you'll be redirected to `/admin/login`
3. Create an account or sign in with existing credentials
4. After authentication, you'll be redirected to the admin dashboard

## Authentication Flow

1. **Unauthenticated users** → Redirected to `/admin/login`
2. **Sign up/Sign in** → Firebase authentication
3. **Authenticated users** → Access to `/admin` dashboard
4. **Sign out** → Redirected back to login page

## Admin Dashboard Features

- Clean, modern sidebar navigation
- User profile display
- Responsive mobile menu
- Placeholder for future admin features
- Sign out functionality

## Future Expansion

The admin panel is ready for additional features such as:
- User management
- Analytics dashboard
- Content management
- Settings panel
- Reports and data visualization

## Firebase Configuration

The app uses the provided Firebase configuration:
- Project ID: `vat-calculator-a1ef2`
- Authentication domain: `vat-calculator-a1ef2.firebaseapp.com`
- All authentication data is stored in Firebase

## Dependencies Added

- `firebase` - Firebase SDK for authentication
- Existing dependencies: `react-router-dom`, `framer-motion`, `lucide-react`, `tailwindcss`
