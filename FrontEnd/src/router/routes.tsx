import Home from "../pages/Home";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import Party from "../pages/party/registration/Party";
import Dashboard from "../pages/party/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/party/register",
        element: <Party />,
      },
      {
        path: "/party/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
