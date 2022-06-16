import React,{memo} from "react";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-4">
            Admin Page
          </div>
        </NavLink>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        <div className="sidebar-heading">SYSTEM MANAGEMENT</div>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#abc"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Action</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Direct to:</h6>
              <NavLink className="collapse-item" to="/quan-ly-user">
                User Management
              </NavLink>
              <NavLink className="collapse-item" to="/quan-ly-movie">
                Movie Management
              </NavLink>
              <a className="collapse-item" href="/">
               Direct to HomePage
              </a>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
export default memo(Sidebar)