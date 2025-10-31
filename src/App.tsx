import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import Home from "./Pages/Home/Home";
import ProjectsList from "./Pages/Projects/ProjectsList";
import ProjectDetails from "./Pages/Projects/ProjectDetails";
import AboutMeFull from "./Pages/AboutMe.tsx/Aboutme";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jagadeesh-portfolio/projects",
        element: <ProjectsList />,
      },
      {
        path: "/jagadeesh-portfolio/projects/:slug",
        element: <ProjectDetails />,
      },
      {
        path: "/jagadeesh-portfolio/about-me",
        element: <AboutMeFull />,
      },
      {
        path: "/jagadeesh-portfolio",
        element: <Home />,
      },
      {
        path: "/jagadeesh-portfolio/*",
        element: <NotFound />,
      },
    ],
  );

  // 🧩 AnimatePresence can wrap the router provider
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}
