import { createBrowserRouter } from "react-router";
import { Homepage } from "./pages/app/homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
]);
