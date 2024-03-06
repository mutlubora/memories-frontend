import App from "@/App.jsx";
import { Activation } from "@/pages/Activation/index.jsx";
import { Home } from "@/pages/Home/index.jsx";
import { Login } from "@/pages/Login/index.jsx";
import { SingUp } from "@/pages/SingUp/index.jsx";
import User from "@/pages/User";
import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/signup",
        Component: SingUp,
      },
      {
        path: "/activation/:token",
        Component: Activation,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/user/:id",
        Component: User,
      },
    ],
  },
]);
