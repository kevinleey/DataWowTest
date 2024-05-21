"use client";

import { usePathname } from "next/navigation";
import { useUser } from "../../_context/UserContext";
import { ROUTES, ROLES, SwitchIcon } from "../../_assets/constants";
import NavbarItem from "./NavbarItem";
import { HistoryIcon, HomeIcon, LogoutIcon } from "../../_assets/constants";

export default function Navbar() {
  const { user, switchRole } = useUser();
  const { role } = user;
  const pathname = usePathname();
  const toggledRole = role === ROLES.ADMIN ? ROLES.USER : ROLES.ADMIN;

  return (
    <div className="navbar">
      <div>
        <h1 className="role-title">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </h1>
        <ul className="navbar-item-container">
          <NavbarItem
            path={ROUTES.HOME}
            icon={HomeIcon}
            text="Home"
            isActive={pathname === ROUTES.HOME}
          />
          <NavbarItem
            path={ROUTES.HISTORY}
            icon={HistoryIcon}
            text="History"
            isActive={pathname === ROUTES.HISTORY}
          />
          <NavbarItem
            icon={SwitchIcon}
            onClick={switchRole}
            text={`Switch to ${toggledRole}`}
          />
        </ul>
      </div>
      <div className="navbar-item-container">
        <NavbarItem path={ROUTES.LOGOUT} icon={LogoutIcon} text="Logout" />
      </div>
    </div>
  );
}
