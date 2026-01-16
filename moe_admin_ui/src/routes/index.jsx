import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import IntroduceLayout from "../layouts/IntroduceLayout";
import IntroducePage from "../pages/Introduce/IntroducePage.jsx";
import { AccountManage, AccountDetail } from "../pages/accounts";
import CourseManagement from "../pages/courses/CourseManagement";
import Dashboard from '../pages/Dashboard/Dashboard';

//Pages

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true, // Đây là trang sẽ hiện ra khi vào địa chỉ "/"
        element: <Dashboard/>
      },
      {
        path: "accounts",
        children: [
          {
            index: true,
            element: <AccountManage />,
          },
          {
            path: ":id",
            element: <AccountDetail />,
          },
        ],
      },
      {
        path: "/courses",
        children: [
          {
            index: true,
            element: <CourseManagement />,
          },
          // {
          //   path: ":id",
          //   element: <CourseDetailPage />,
          // },
        ],
      }
    ],
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