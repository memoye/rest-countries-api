import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// pages
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/country/:id",
        element: <CountryDetails />,
      },
    ],
  },
]);
