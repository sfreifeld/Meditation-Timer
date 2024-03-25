import Home from "./pages/Home"
import Settings from "./pages/Settings"
import Statistics from "./pages/Statistics";

const routes = [
  {
    path: "/",
    element: <Home />,
    //errorElement: <ErrorPage />
  },
  {
    path: "/statistics",
    element: <Statistics />,
    //errorElement: <ErrorPage />
  },
  {
    path: "/settings",
    element: <Settings />,
    //errorElement: <ErrorPage />
  }
   
  ];

export default routes;