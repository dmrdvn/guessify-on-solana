import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Explore from "../pages/explore";
import GBots from "../pages/gbots";
import Profile from "../pages/profile";
import Events from "../pages/events";
import MainLayout from "../layouts/main";
import PostCreation from "../pages/postcreation";
import Proposals from "../pages/proposals";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "g-bots",
        element: <GBots />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "proposals",
        element: <Proposals />,
      },
      {
        path: "postcreate",
        element: <PostCreation />,
      },
    ],
  },
]);

export default routes;
