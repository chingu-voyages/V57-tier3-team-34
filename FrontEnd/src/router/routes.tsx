import Home from "../pages/Home";
import Register from "../pages/voter/Register";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import Party from "../pages/party/registration/Party";
import Dashboard from "../pages/party/Dashboard";
import Overview from "../pages/party/Overview";
import Candidates from "../pages/party/Candidates";
import Candidate from "../pages/party/registration/Candidate";
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
				path: "/candidate/register",
				element: <Candidate />,
			},
			{
				path: "/voter/register",
				element: <Register />,
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
