import { createBrowserRouter } from "react-router";
import { Homepage } from "@/pages/app/homepage";
import { NotFound } from "@/pages/app/404";
import { Redirect } from "@/pages/app/redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Homepage />,
  },
  {
    path: "/:name",
    element: <Redirect />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
]);
