import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";
import Authform from "./pages/Signin/Authform";

const Layout = () => {
  return (
    <div className="md:w-10/12 mx-auto">
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Authform currentForm="signIn" />,
  },
  {
    path: "/signout",
    element: <Authform currentForm="signUp" />,
  },
]);

function App() {
  return (
    <div className="bg-black absolute h-100 right-0 top-0 w-screen text-white">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
