import { NavLink, useLocation } from "react-router-dom";

const CustomNavLink = ({ to, children, exact, ...props }: any) => {
  const location = useLocation();

  const isActive = () => {
    if (location.pathname === to) {
      return true;
    }
    if (to === "/" && location.pathname.startsWith("/user")) {
      return true;
    }
    return false;
  };

  return (
    <NavLink
      to={to}
      className={
        isActive()
          ? "bg-primary text-white w-full text-center rounded-lg py-2"
          : "w-full text-center text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary py-2"
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
