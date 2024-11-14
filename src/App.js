import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import CRUD from "./CRUD";

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
