import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const locArr = pathname.split("/").filter((v) => v !== "");

  const navMenuElementStyle =
    "px-4 py-6 overflow-hidden border-t border-cyan-400/30 hover:text-[#00ffe5] hover:drop-shadow-[0_0_20px_#00ffe5] transition-all duration-300";

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactMeElement = document.getElementById("contact-me");
    if (contactMeElement) {
      contactMeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const navigationMenu = document.getElementById("navigation-menu");
    if (navigationMenu && navigationMenu.classList.contains("__show")) {
      navigationMenu.style.height = "0";
      setTimeout(() => navigationMenu.classList.remove("__show"), 300);
    }
  };

  const menuLinks = [
    { to: "", title: "Home", id: "nav-home" },
    { to: "projects", title: "Projects", id: "nav-projects" },
    {
      to: "https://drive.google.com/file/d/1MfsXpNlgKppnHvmwcpzISwZCl99xdEj5/view?usp=drive_link",
      title: "Resume",
      id: "nav-resume",
    },
  ];

  return (
    <>
      {/* Mobile Menu */}
      <div
        id="navigation-menu"
        className="fixed inset-0 overflow-hidden block md:hidden z-30 bg-[#0a0a1f] backdrop-blur-lg transition-all duration-300"
        style={{ height: 0 }}
      >
        <div className="flex flex-col justify-between h-full py-5">
          <section className="flex items-center justify-between px-4 pb-5 text-4xl border-b border-cyan-400/30">
            <span className="text-[#00ffe5] font-bold tracking-widest drop-shadow-[0_0_15px_#00ffe5]">
              Menu
            </span>
            <button
              className="border-0 material-symbols-outlined text-[#00ffe5] text-3xl"
              onClick={() => {
                const nav = document.getElementById("navigation-menu");
                if (nav) {
                  nav.style.height = "0";
                  setTimeout(() => nav.classList.remove("__show"), 300);
                }
              }}
            >
              close
            </button>
          </section>

          <section className="flex flex-col text-[2rem] px-4">
            {menuLinks.map(({ to, title, id }, indx) => (
              <Link
                key={indx}
                to={title !== "Resume" ? `/portfolio/${to}` : to}
                target={title === "Resume" ? "_blank" : "_self"}
                className={navMenuElementStyle}
                id={id}
                data-testid={id}
                onClick={() => {
                  const nav = document.getElementById("navigation-menu");
                  if (nav) {
                    nav.style.height = "0";
                    setTimeout(() => nav.classList.remove("__show"), 300);
                  }
                }}
              >
                {title}
              </Link>
            ))}

            <button
              className={navMenuElementStyle}
              onClick={handleContactClick}
              data-testid="nav-contact-me"
            >
              Contact Me
            </button>
          </section>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-20 flex items-center justify-between w-full px-4 py-5 lg:px-16 md:px-8 bg-[#0a0a1f] backdrop-blur-md">
        {/* Logo + Back Button */}
        <div className="flex items-center gap-4">
          {locArr[locArr.length - 1] !== "portfolio" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="material-symbols-outlined text-[#00ffe5] text-3xl"
              onClick={() => navigate(-1)}
            >
              Jagadeesh Chandra
            </motion.button>
          )}
          <Link to={"/portfolio/"}>
            <svg
              id="logo"
              xmlns="http://www.w3.org/2000/svg"
              width="203"
              height="28"
              viewBox="0 0 203 28"
            >
              <rect width="100%" height="100%" fill="transparent" />
              <g transform="matrix(1 0 0 1 101.75 13.56)">
                <path
                  fontFamily="Poppins"
                  fontSize="24"
                  fontWeight="bold"
                  d="M-85.48 7.54L-90.49 7.54..."
                  fill="#00ffe5"
                />
              </g>
            </svg>
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="flex md:hidden">
          <button
            className="border-0 material-symbols-outlined text-[#00ffe5] text-3xl"
            onClick={() => {
              const nav = document.getElementById("navigation-menu");
              if (nav) {
                nav.classList.add("__show");
                nav.style.height = "100dvh";
              }
            }}
          >
            menu
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuLinks.map(({ to, title, id }, indx) => (
            <motion.div
              key={indx}
              whileHover={{ y: -3, textShadow: "0 0 15px #00ffe5" }}
              className="relative cursor-pointer text-[#e0e0e0] font-medium"
            >
              <Link
                to={title !== "Resume" ? `/portfolio/${to}` : to}
                target={title === "Resume" ? "_blank" : "_self"}
                data-testid={id}
              >
                {title}
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#00ffe5] rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ y: -3, textShadow: "0 0 15px #00ffe5" }}
            className="relative cursor-pointer text-[#00ffe5] font-semibold text-lg"
            onClick={handleContactClick}
          >
            Contact Me
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#00ffe5] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </div>
      </nav>
    </>
  );
}
