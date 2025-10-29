import { Link } from "react-scroll";

export default function Navbar({ onNavigate }: { onNavigate?: () => void }) {
  const navItems = ["home", "projects", "education", "experience", "hobbies", "contact"];
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a]/60 backdrop-blur-md border-b border-[#00ffff33] z-50">
      <ul className="flex justify-center gap-8 py-4 text-[#bdfaff] font-semibold tracking-wider">
        {navItems.map((item) => (
          <li key={item}>
            <Link
              to={item}
              smooth={true}
              duration={900}
              onClick={() => onNavigate && onNavigate()}
              className="cursor-pointer hover:text-[#00ffff] transition-all hover:drop-shadow-[0_0_6px_#00ffff]"
            >
              {item.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
