import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
