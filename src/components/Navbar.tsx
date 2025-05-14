import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Introduction", href: "#introduction" },
  { name: "Rules", href: "#rules" },
  { name: "Patterns", href: "#patterns" },
  { name: "Game", href: "/simulation" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // toggle mobile menu
  const toggleMenu = () => setIsOpen((o) => !o);
  const closeMenu = () => setIsOpen(false);

  // scroll and section tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      // only hash sections
      const hashes = navItems
        .filter((i) => i.href.startsWith("#"))
        .map((i) => i.href.slice(1));

      for (const sec of hashes) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(sec);
            return;
          }
        }
      }
      // at top
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // navigate to hash on home
  const handleHashNav = (href: string) => {
    closeMenu();
    const sec = href.slice(1);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sec } });
    } else {
      const el = document.getElementById(sec);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // improved active detection
  const isActive = (item: NavItem) => {
    // Home only when no section active and on root
    if (item.href === "/") {
      return location.pathname === "/" && activeSection === "";
    }
    // simulation page
    if (item.href.startsWith("/")) {
      return location.pathname === item.href;
    }
    // hash links
    if (item.href.startsWith("#")) {
      return activeSection === item.href.slice(1);
    }
    return false;
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="text-white font-bold text-lg"
            onClick={() => {
              closeMenu();
              if (location.pathname !== "/") navigate("/");
            }}
          >
            Conway's Game
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex md:space-x-4">
            {navItems.map((item) => {
              const active = isActive(item);

              // CTA for Game
              if (item.name === "Game") {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => closeMenu()}
                    className={`px-4 py-2 font-semibold rounded-xl transition ${
                      active
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              // Home and hash links on desktop
              if (item.href.startsWith("#")) {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleHashNav(item.href)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "text-white bg-gray-800/50"
                        : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => closeMenu()}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/30 focus:outline-none"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item);

            if (item.name === "Game") {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => closeMenu()}
                  className={`block px-4 py-2 font-semibold rounded-xl transition ${
                    active
                      ? "bg-indigo-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            }

            if (item.href.startsWith("#")) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleHashNav(item.href)}
                  className={`block px-3 py-2 w-full text-start rounded-xl text-base font-medium transition-colors ${
                    active
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => closeMenu()}
                className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? "text-white bg-gray-800/50"
                    : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
