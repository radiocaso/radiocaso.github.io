import { NavLink } from "react-router";

const sections = ["agenda", "archivo", "publicaciones", "info"];

export default function NavMenu() {
  return (
    <nav className="gap-1 sm:flex">
      {sections.map((section) => (
        <NavLink
          key={section}
          to={`/${section}`}
          className={({ isActive }) =>
            `${isActive ? "bg-white text-black" : "border-white/20"} flex items-center justify-center rounded-full border text-xs uppercase transition-colors sm:size-28`
          }
        >
          {section}
        </NavLink>
      ))}
    </nav>
  );
}
