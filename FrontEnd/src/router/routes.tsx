import Home from "../pages/Home";
import VoterRegister from "../pages/voter/Register";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import PartyRegistration from "../pages/party/registration/Party";
import PartyLayout from "../pages/party/Layout";
import PartyDashboard from "../pages/party/Dashboard";
import Candidates from "../pages/party/Candidates";
import Candidate from "../pages/party/registration/Candidate";
import Election from "../pages/voter/Election";
import Results from "../pages/voter/Results";
import Auth from "../pages/Auth";
import Logout from "../pages/Logout";
// import VoterDashboard from "../pages/voter/Dashboard";
import VoterLayout from "../pages/voter/Layout";
import Error from "../pages/Error";
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
        path: "*",
        element: <Error />,
      },
      {
        path: "/auth/logout",
        element: <Logout />,
      },
      {
        path: "/auth/login",
        element: <Auth />,
      },
      {
        path: "/party/register",
        element: <PartyRegistration />,
      },
      {
        path: "/candidate/register",
        element: <Candidate />,
      },
      {
        path: "/voter/register",
        element: <VoterRegister />,
      },
      {
        path: "/voter/results",
        element: <Results />,
      },
      {
        path: "/party",
        element: <PartyLayout />,
        children: [
          { index: true, path: "dashboard", element: <PartyDashboard /> },
          { path: "candidates", element: <Candidates /> },
        ],
      },
      {
        path: "/voter",
        element: <VoterLayout />,
        children: [
          { index: true, path: "dashboard", element: <Election /> },
          { path: "election", element: <Election /> },
        ],
      },
    ],
  },
]);

export default router;
