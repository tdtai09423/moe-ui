import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import IntroduceLayout from "../layouts/IntroduceLayout";
import IntroducePage from "../pages/Introduce/IntroducePage.jsx";
import AccountManage from "../pages/accounts/AccountManage";
import StudentDetailPage from "../pages/accounts/components/AccountDetail.jsx";
import CourseManagement from "../pages/courses/CourseManagement";

//Pages

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true, // Đây là trang sẽ hiện ra khi vào địa chỉ "/"
        element: <div>Trang Dashboard</div>,
      },
      {
        path: "/accounts",
        children: [
          {
            index: true,
            element: <AccountManage />,
          },
          {
            path: ":id",
            element: <StudentDetailPage />,
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
    path: "/introduce",
    children: [
      {
        index: true,
        element: <IntroducePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
