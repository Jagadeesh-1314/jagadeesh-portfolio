import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutMeFull from "./Pages/AboutMe.tsx/Aboutme";
import NotFound from "./components/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import ProjectsList from "./Pages/Projects/ProjectsList";
import ProjectDetails from "./Pages/Projects/ProjectDetails";

export default function AnimatedRoutes() {
  const paths = [
    {
      path: "/jagadeesh-portfolio/",
      element: <Home />,
    },
    {
      path: "/jagadeesh-portfolio/projects",
      element: <ProjectsList />,
    },
    {
      path: "/jagadeesh-portfolio/about-me",
      element: <AboutMeFull />,
    },
    {
      path: "/jagadeesh-portfolio/projects/:slug",
      element: <ProjectDetails />
    },
    {
      path: "/jagadeesh-portfolio/*",
      element: <NotFound />,
    },
  ];
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {paths.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </AnimatePresence>
  );
}
