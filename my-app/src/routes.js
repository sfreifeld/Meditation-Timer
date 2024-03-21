import Home from "./pages/Home"
import Settings from "./pages/Settings"

const routes = [
  {
    path: "/",
    element: <Home />,
    //errorElement: <ErrorPage />
  },
  {
    path: "/settings",
    element: <Settings />,
    //errorElement: <ErrorPage />
  }
   
  ];

export default routes;