import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { useEffect } from "react";
const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      navigate("/");
    }
  }, [isSuccess]);

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-12 w-12 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">{user.username}</p>
          </div>
        </Link>
        <ul className="flex  flex-col gap-5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link ${isActive && "bg-primary-500"} `}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex font-inter gap-4 items-center p-4 "
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {isSuccess ? (
        <p>Loading...</p>
      ) : (
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={(e) => handleSignOut(e)}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      )}
    </nav>
  );
};

export default LeftSidebar;
