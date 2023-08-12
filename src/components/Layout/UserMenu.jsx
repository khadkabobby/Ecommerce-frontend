import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="center">
      <div className="list-group">
        <NavLink to={"/dashboard/user"}>
          <h4>User Dashboard</h4>
        </NavLink>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
