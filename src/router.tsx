import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// pages
import CountryDetails from "./pages/CountryDetails";
import ErrorElement from "./components/ErrorElement";
import Home from "./pages/Home";

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
    errorElement: <ErrorElement />,
  },
]);
