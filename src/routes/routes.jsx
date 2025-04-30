import { createBrowserRouter } from "react-router-dom";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Dashboard from "../pages/Dashboard/Dashboard";

import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Layout from "../components/Layout/Layout";
import ListPartner from "../pages/Partners/ListPartner";
import AddPartner from "../pages/Partners/AddPartner";
import EditPartner from "../pages/Partners/EditPartner";
import ListReviews from "../pages/Reviews/ListReviews";
import AddReview from "../pages/Reviews/AddReview";
import EditReview from "../pages/Reviews/EditReview";
import ViewReview from "../pages/Reviews/ViewReview";

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
      {
        path: "/partners",
        element: <ListPartner />,
      },
      {
        path: "/partners/add-partner",
        element: <AddPartner />,
      },
      {
        path: "/partners/edit-partner/:id",
        element: <EditPartner />,
      },
      {
        path: "/reviews",
        element: <ListReviews />,
      },
      {
        path: "/reviews/add-review",
        element: <AddReview />,
      },
      {
        path: "/reviews/edit-review/:id",
        element: <EditReview />,
      },
      {
        path: "/reviews/view-review/:id",
        element: <ViewReview />,
      },
    ],
  },
]);

export default Routes;
