// import { useEffect, useState } from "react";
// import { getProjects } from "../lib/getProjects";
// import { motion, AnimatePresence } from "framer-motion";
// import type { Project } from "../types/Project";

// export default function Projects() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [hovered, setHovered] = useState<string | null>(null);
//   const [selected, setSelected] = useState<Project | null>(null);

//   useEffect(() => {
//     getProjects().then(setProjects);
//   }, []);

//   return (
//     <section
//       id="projects"
//       className="relative min-h-screen bg-[#06080a] text-[#dfffff] flex flex-col items-center justify-center px-6 overflow-visible"
//     >
//       {/* Animate title on scroll */}
//       <motion.h2
//         initial={{ opacity: 0, y: 50, letterSpacing: "0em" }}
//         whileInView={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
//         viewport={{ once: true, amount: 0.8 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="mt-10 text-5xl font-bold text-[#00ffe5] drop-shadow-[0_0_12px_#00ffe5] mb-5 tracking-widest"
//       >
//         👨‍💻 What I’ve Built
//       </motion.h2>

//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-lg text-[#bdfaff] tracking-wide mb-12"
//       >
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//           style={{ display: "block" }}
//         >
//           🚀 Showcasing My Journey Through Code
//         </motion.span>
//       </motion.p>

//       {/* Split layout: left list, right hover card */}
//       <div className="relative flex flex-col md:flex-row w-full max-w-6xl gap-10 items-start justify-between">
//         {/* Project titles on the left */}
//         <div className="flex flex-col gap-6 w-full md:w-1/2">
//           {projects.map((p) => (
//             <motion.div
//               key={p.id}
//               onMouseEnter={() => setHovered(p.id)}
//               onMouseLeave={() => setHovered(null)}
//               onClick={() => setSelected(p)}
//               className={`cursor-pointer relative rounded-xl transition-all duration-500 ease-out border border-[#00ffe522] 
//                 bg-[#11111a]/80 px-8 py-6 backdrop-blur-sm
//                 ${hovered && hovered !== p.id
//                   ? "opacity-30 blur-sm scale-[0.97]"
//                   : "opacity-100 scale-100"}
//               `}
//             >
//               <h3 className="text-2xl md:text-3xl font-semibold tracking-wider text-[#00ffe5]">
//                 {p.title}
//               </h3>
//               <p className="text-sm text-[#bdfaff]/80 italic mt-1">
//                 {p.tech.join(", ")}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Hovered card appears on right */}
//         <div className="relative w-full md:w-1/2 h-[500px] flex items-center justify-center">
//           <AnimatePresence>
//             {hovered && (
//               <motion.div
//                 key={hovered}
//                 initial={{ opacity: 0, x: 50, scale: 0.9 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 exit={{ opacity: 0, x: 50, scale: 0.9 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className="absolute w-[90%] md:w-[400px] bg-[#0b0f13]/90 backdrop-blur-lg rounded-2xl p-5 shadow-[0_0_25px_#00ffe566]"
//               >
//                 <img
//                   src={projects.find((p) => p.id === hovered)?.image}
//                   alt={projects.find((p) => p.id === hovered)?.title}
//                   className="w-full h-56 object-cover rounded-lg mb-4"
//                 />
//                 <h4 className="text-xl font-semibold text-[#00ffe5] mb-2">
//                   {projects.find((p) => p.id === hovered)?.title}
//                 </h4>
//                 <p className="text-[#bdfaff] text-sm leading-relaxed">
//                   {projects.find((p) => p.id === hovered)?.description}
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Fullscreen Modal */}
//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
//             onClick={() => setSelected(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-[#0b0f13] border border-[#00ffe566] rounded-2xl m-5 p-8 max-w-lg text-center shadow-[0_0_25px_#00ffe522]"
//             >
//               <img
//                 src={selected.image}
//                 alt={selected.title}
//                 className="w-full h-56 object-cover rounded-xl mb-4"
//               />
//               <h3 className="text-3xl font-semibold text-[#00ffe5] mb-3">
//                 {selected.title}
//               </h3>
//               <p className="text-[#bdfaff] mb-4">{selected.description}</p>
//               <div className="flex flex-wrap justify-center gap-2 mb-6">
//                 {selected.tech.map((t) => (
//                   <span
//                     key={t}
//                     className="text-xs bg-[#00ffe511] text-[#00ffe5] px-2 py-1 rounded-full"
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//               <a
//                 href={selected.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#00ffe5] hover:underline"
//               >
//                 🔗 Visit Project
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getProjects } from "../lib/getProjects";
import type { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeImage, setActiveImage] = useState<string>(projects[0]?.image || "");
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveImage(projects[index].image);
        }
      });
    }, observerOptions);

    const rightSection = rightRef.current;
    if (rightSection) {
      const cards = rightSection.querySelectorAll("div[data-index]");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, [projects]);

  return (
    <section className="relative bg-[#06080a] text-[#dfffff] min-h-screen">
      {/* Title Section */}
      <div className="py-16 text-center border-b border-[#00ffe522] bg-[#06080a]">
        {/* Animate title on scroll */}
        <motion.h2
          initial={{ opacity: 0, y: 50, letterSpacing: "0em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00ffe5] drop-shadow-[0_0_12px_#00ffe5] mb-5 tracking-widest text-center  "
        >
          👨‍💻 What I’ve Built
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-[#bdfaff] tracking-wide mb-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{ display: "block" }}
          >
            🚀 Showcasing My Journey Through Code
          </motion.span>
        </motion.p>
      </div >

      {/* Desktop/Tablet Layout */}
      < div className="hidden md:flex relative w-full" >
        {/* Left Side - Sticky Image Panel */}
        < div
          className="w-[45%]"
          style={{
            position: "sticky",
            top: "0px",
            height: "100vh",
          }
          }
        >
          <div
            style={{
              display: "grid",
              placeContent: "center",
              height: "100%",
            }}
          >
            <div className="w-full max-w-lg px-8">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt="Project Preview"
                className="w-full aspect-square object-cover rounded-3xl border-2 border-[#00ffe522] shadow-[0_0_35px_#00ffe555]"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            </div>
          </div>
        </div >

        {/* Right Side - Scrollable Projects List */}
        < div
          ref={rightRef}
          className="w-[55%] bg-[#090f15] text-[#dfffff]"
          style={{
            paddingInline: "10%",
            paddingBlock: "100px",
          }}
        >
          {
            projects.map((project, index) => (
              <div
                key={project.id}
                data-index={index}
                style={{
                  minHeight: "calc(90vh - 55px)",
                  paddingBottom: "100px",
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className="mt-10 text-4xl font-semibold mb-4 text-[#00ffe5] drop-shadow-[0_0_10px_#00ffe5]"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[#bdfaff]/80 font-bold mb-4 text-lg"
                >
                  {project.tech.join(" • ")}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[#e6ffff] text-lg leading-relaxed mb-6"
                >
                  {project.description}
                </motion.p>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-block border border-[#00ffe555] text-[#00ffe5] px-6 py-3 rounded-full hover:bg-[#00ffe522] hover:shadow-[0_0_20px_#00ffe544] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  🔗 View Project
                </motion.a>
              </div>
            ))
          }
          <div className="flex justify-end">
            <motion.button
              onClick={() => navigate("/jagadeesh-portfolio/projects")}
              whileHover={{ scale: 1.05 }}
              className="btn-animated"
            >
              <span>👀 View More Projects →</span>
            </motion.button>
          </div>
        </div >
      </div >

      {/* Mobile Layout */}
      < div className="md:hidden w-full px-6 py-12 space-y-16" >
        {
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-[#090f15]/70 backdrop-blur-sm rounded-2xl border border-[#00ffe522] shadow-[0_0_25px_#00ffe533] overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-[#00ffe5] drop-shadow-[0_0_10px_#00ffe5]">
                  {project.title}
                </h3>
                <p className="text-[#bdfaff]/80 italic text-sm mb-3">
                  {project.tech.join(" • ")}
                </p>
                <p className="text-[#e6ffff] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#00ffe555] text-[#00ffe5] px-5 py-2 rounded-full hover:bg-[#00ffe522] transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  🔗 View Project
                </motion.a>
              </div>
            </motion.div>
          ))
        }
      </div >
    </section >
  );
}
