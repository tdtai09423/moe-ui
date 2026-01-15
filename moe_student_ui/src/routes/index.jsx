import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

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
        element: <div>Trang Quản lý balance</div>
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
        element: <div>Trang support</div>
      },
    ]
  },

  // --- 3. FALLBACK ---
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);