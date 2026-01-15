import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import IMG1 from '../assets/images/IMG1.jpg';
import IMG2 from '../assets/images/IMG2.jpg';


// Layouts & Guards
import MainLayout from '../layouts/MainLayout.jsx';
import PrivateRoute from './PrivateRoute.jsx'; 

// Pages
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import CourseManagement from '../pages/CourseManagement/CourseManagement.jsx';
import CourseDetails from '../pages/CourseDetails/CourseDetails.jsx';
import UserProfile from '../pages/MyProfile/UserProfile.jsx';
import IntroducePage from '../pages/Introduce/IntroducePage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx'; 

export const router = createBrowserRouter([
  // --- 1. PUBLIC ROUTES  ---
  
  {
    path: '/',
    element: <IntroducePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // --- 2. PROTECTED ROUTES  ---
  {
 
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard', 
        element: <Dashboard />
      },
      {
        path: 'balance',
        element: (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '80vh',
            padding: '40px',
            background: '#f5f5f5'
          }}>
            <img 
              src={IMG1} 
              alt="Account Balance" 
              style={{ 
                maxWidth: '100%', 
                width: '1200px',
                height: 'auto',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
              }} 
            />
          </div>
        )
      },
      {
        path: 'courses',
        element: <CourseManagement />
      },
      {
        path: 'course-details/:id',
        element: <CourseDetails />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'support',
        element: (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '80vh',
            padding: '40px',
            background: '#f5f5f5'
          }}>
            <img 
              src={IMG2} 
              alt="Help & Support" 
              style={{ 
                maxWidth: '100%', 
                width: '1200px',
                height: 'auto',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
              }} 
            />
          </div>
        )
      },
    ]
  },

  // --- 3. FALLBACK ---
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);