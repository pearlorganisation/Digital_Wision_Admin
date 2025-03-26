import { createBrowserRouter } from "react-router-dom";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Dashboard from "../pages/Dashboard/Dashboard";

import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Layout from "../components/Layout/Layout";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/",
    element: (
      //<ProtectedRoute>
      <Layout />
      // </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default Routes;
