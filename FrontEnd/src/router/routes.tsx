import Home from "../pages/Home";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import Party from "../pages/party/registration/Party";

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
    ],
  },
]);

export default router;
