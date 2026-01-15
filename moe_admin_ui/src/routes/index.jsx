import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import IntroducePage from '../pages/Introduce/IntroducePage.jsx';
import AccountManage from '../pages/accounts/AccountManage';

//Pages

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true, 
        element: <div>Trang Dashboard</div>
      },
      {
        path: '/accounts',
        element: <AccountManage/>
      }
    ]
  },
  {
    path: '/introduce',
    children: [
      {
        index: true,
        element: <IntroducePage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);