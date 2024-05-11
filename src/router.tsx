import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      { path: "/country:id", element: <div>country details</div> },
    ],
  },
]);
