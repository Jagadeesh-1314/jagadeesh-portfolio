import { motion } from "framer-motion";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "XYZ Pvt Ltd",
    duration: "Jun 2023 – Sept 2023",
    description:
      "Developed responsive UI components with React and Tailwind CSS. Collaborated with backend team for API integration.",
  },
  {
    title: "Web Developer",
    company: "ABC Technologies",
    duration: "Oct 2023 – Jan 2024",
    description:
      "Built dynamic websites and implemented animations using Framer Motion. Improved page speed and SEO performance.",
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Remote Projects",
    duration: "Feb 2024 – Present",
    description:
      "Created full-stack web apps using React, Firebase, and Node.js. Delivered interactive dashboards and e-commerce systems.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative bg-[#0b0f1a] text-white py-24 px-4 md:px-12 overflow-hidden"
    >
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
        My Experience Journey
      </h2>

      {/* Center Timeline Line */}
      <div className="absolute left-1/2 top-0 h-full w-[3px] bg-linear-to-b from-cyan-500 via-transparent to-cyan-500 opacity-60" />

      <div className="flex flex-col gap-20 max-w-5xl mx-auto relative">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative w-full md:w-[48%] bg-[#111827]/70 border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_#00ffff55] transition-all
              ${index % 2 === 0 ? "md:self-start md:mr-auto" : "md:self-end md:ml-auto"}`}
          >
            {/* Connector Dot */}
            <div
              className={`absolute w-5 h-5 bg-cyan-400 rounded-full top-6 
              ${index % 2 === 0 ? "-right-10" : "-left-10"}`}
            ></div>

            <h3 className="text-2xl font-semibold text-cyan-300 mb-1">
              {exp.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              {exp.company} — {exp.duration}
            </p>
            <p className="text-gray-300 leading-relaxed">{exp.description}</p>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent hover:border-cyan-400/40 transition-all duration-300"></div>
          </motion.div>
        ))}
      </div>

      {/* Floating background glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-cyan-400/20 blur-[120px] bottom-0 left-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/20 blur-[120px] top-0 right-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
    </section>
  );
}
