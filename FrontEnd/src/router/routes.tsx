import Home from "../pages/Home";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import Party from "../pages/party/registration/Party";
import Dashboard from "../pages/party/dashboard/Dashboard";
import Overview from "../pages/party/pages/Overview";
import Candidates from "../pages/party/pages/Candidates";

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
        path: "/party",
        element: <Dashboard />,
        children: [
          { index: true, path: "dashboard", element: <Overview /> },
          { path: "candidates", element: <Candidates /> },
        ],
      },
    ],
  },
]);

export default router;
