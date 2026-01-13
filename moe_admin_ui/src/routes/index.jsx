import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import IntroduceLayout from '../layouts/IntroduceLayout';
import IntroducePage from '../pages/Introduce/IntroducePage.jsx';

//Pages

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true, // Đây là trang sẽ hiện ra khi vào địa chỉ "/"
        element: <div>Trang Dashboard</div> 
      },
      {
        path: '/accounts',
        element: <div>Trang Quản lý User</div>
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