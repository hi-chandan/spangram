import { bottombarLinks } from "@/constants";
import { useLocation, Link } from "react-router-dom";
const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            className={` ${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition `}
            key={link.label}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            {link.label}
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
