import { createBrowserRouter } from "react-router";
import { Homepage } from "./pages/app/homepage";
import { NotFound } from "@/pages/app/404";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Homepage />,
  },
]);

// {
//   path: "/:link-name",
// },
