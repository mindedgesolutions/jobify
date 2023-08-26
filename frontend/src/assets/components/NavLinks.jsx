import React from "react";
import { useDashboardContext } from "../../pages/DashboardLayout";
import links from "../../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
    const data = useDashboardContext();

    return (
        <div className="nav-links">
            {links.map((link) => {
                return (
                    <NavLink
                        to={link.path}
                        key={link.text}
                        className="nav-link"
                        onClick={props.isBigSidebar ? null : data.toggleSidebar}
                        end
                    >
                        <div className="icon">{link.icon}</div>
                        {link.text}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default NavLinks;
