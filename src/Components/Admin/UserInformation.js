import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink,Link } from 'react-router-dom';
import React, { Component } from 'react'
  export default class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          navigate: false,
          visibleNavBar: true
        };
      }
      logout = () => {
        localStorage.clear("token");
        this.setState({ navigate: true });
      };
    renderHTML() {
        const innerHTML = localStorage.getItem("UserAdmin");
        const obj = JSON.parse(innerHTML);
        const { navigate } = this.state;
        if (navigate) {
          return window.location.reload();
        }
        if (localStorage.getItem("UserAdmin")) {
          return (
            <ul className="navbar-nav ml-auto col-md-2">
            <div className="topbar-divider d-none d-sm-block" />
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="\a" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-dark small">{obj.hoTen}</span>
                <FontAwesomeIcon icon={faUser} />
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow " aria-labelledby="userDropdown">
                <Link className="dropdown-item" to="/infoAdmin">
                <FontAwesomeIcon icon={faUser} />
                  Profile
                </Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item"  onClick={this.logout} to="/" data-toggle="modal" data-target="#logoutModal">
                <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </Link>
              </div>
            </li>
          </ul>
                 
          );
        } else {
          return (
            <ul className="navbar-nav">
              <NavLink activeClassName="active" className="btn-login" to="/login">
                Login
              </NavLink>
            </ul>
          );
          }
        }
      render() {
          return (
              <>
                  {this.renderHTML()}
              </>
          )
      }
  }