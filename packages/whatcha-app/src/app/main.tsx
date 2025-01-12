import { createRoot } from "react-dom/client";
import "@common/styles/base.css";
import { RouterProvider } from "react-router";
import router from "./router";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
