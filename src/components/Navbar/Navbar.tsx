import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/jagadeesh-portfolio/", title: "Home" },
    { href: "/jagadeesh-portfolio/projects", title: "Projects" },
    {
      href: "https://drive.google.com/file/d/1RvhxvuVuZ1K83hQ2AjMTzIT1QBSh4HjE/view",
      title: "Resume",
      external: true,
    },
  ];

  const handleNavigation = (link: { href: string; external?: boolean }) => {
    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    } else {
      navigate(link.href); // ✅ SPA navigation
    }
    closeMenu();
  };

  const closeMenu = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setAnimatingOut(false);
      setShowItems(false);
      setMenuOpen(false);
    }, 500);
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
    setAnimatingOut(false);
    setTimeout(() => setShowItems(true), 100);
  };

  const handleContactClick = () => {
    const contactElement = document.getElementById("footer");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeMenu();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a1f]/95 backdrop-blur-md shadow-lg shadow-cyan-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full px-4 py-5 lg:px-16 md:px-8">
          <button
            onClick={() => navigate("/jagadeesh-portfolio/")}
            className="font-bold text-[#00ffe5] drop-shadow-[0_0_15px_#00ffe5] hover:drop-shadow-[0_0_25px_#00ffe5] transition-all duration-300 
             text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide"
          >
            Jagadeesh Chandra
          </button>

          {/* Hamburger button */}
          <button
            className="md:hidden text-[#00ffe5] text-2xl hover:drop-shadow-[0_0_15px_#00ffe5] transition-all"
            onClick={handleOpenMenu}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center text-lg lg:text-xl">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(link)}
                className="relative text-[#e0e0e0] font-medium hover:text-[#00ffe5] transition-colors duration-300 group"
              >
                {link.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ffe5] rounded-full transition-all duration-400 group-hover:w-full" />
              </button>
            ))}

            <button
              onClick={handleContactClick}
              className="relative text-[#00ffe5] font-semibold hover:drop-shadow-[0_0_15px_#00ffe5] transition-all duration-300 group"
            >
              Contact Me
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ffe5] rounded-full transition-all duration-400 group-hover:w-full" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Side drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#0a0a1f] shadow-2xl transform transition-all duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-5 border-b border-cyan-400/30">
              <span className="text-2xl font-bold text-[#00ffe5] drop-shadow-[0_0_15px_#00ffe5]">
                Menu
              </span>
              <button
                onClick={closeMenu}
                className="text-[#00ffe5] text-2xl hover:drop-shadow-[0_0_15px_#00ffe5] transition-all"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col justify-end h-full pb-6">
              <div className="flex flex-col py-4 ">
                {showItems &&
                  navLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(link)}
                      className={`px-6 py-4 text-left text-xl text-[#00ffe5] hover:bg-cyan-400/10 
                                hover:drop-shadow-[0_0_15px_#00ffe5] transition-all duration-300 
                                border-b border-cyan-400/20 w-full
                                ${
                                  animatingOut
                                    ? "animate-slide-out"
                                    : "animate-slide-in"
                                }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {link.title}
                    </button>
                  ))}

                {showItems && (
                  <button
                    onClick={handleContactClick}
                    className={`px-6 py-4 text-left text-xl text-[#00ffe5] hover:bg-cyan-400/10 hover:drop-shadow-[0_0_15px_#00ffe5] transition-all duration-300 border-b border-cyan-400/20 
                      ${animatingOut ? "animate-slide-out" : "animate-slide-in"}`}
                    style={{ animationDelay: `${navLinks.length * 100}ms` }}
                  >
                    Contact Me
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
