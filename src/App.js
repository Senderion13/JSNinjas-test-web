import { React } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CRUD from "./pages/EditSuperhero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/crud",
    element: <CRUD />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
