import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "nav_content mobile",
      navigate: false,
      visibleNavBar: true,
      menuClass: "mobilecontainer",
    };
  }

  scrollToMovie = () => {
    window.scroll({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    this.setState({
      menuClass: "mobilecontainer",
      menu: "nav_content mobile",
    });
  };
  scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.setState({
      menuClass: "mobilecontainer",
      menu: "nav_content mobile",
    });
  };
  scrollToFooter = () => {
    window.scroll({
      top: 50000,
      left: 0,
      behavior: "smooth",
    });
    this.setState({
      menuClass: "mobilecontainer",
      menu: "nav_content mobile",
    });
  };
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos <= currentScrollPos;
    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleClick = () => {
    this.state.menuClass === "mobilecontainer"
      ? this.setState({ menuClass: "mobilecontainer change" })
      : this.setState({ menuClass: "mobilecontainer" });
    if (this.state.menuClass === "mobilecontainer") {
      this.setState({
        menu: "nav_content mobile menu",
      });
    } else {
      this.setState({
        menu: "nav_content mobile",
      });
    }
  };
  renderHTML() {
    const innerHTML = localStorage.getItem("UserHome");
    const obj = JSON.parse(innerHTML);
    const { navigate } = this.state;
    if (navigate) {
      return window.location.reload();
    }
    if (localStorage.getItem("UserHome")) {
      return (
        <li
          className={
            obj.maLoaiNguoiDung === "KhachHang"
              ? "logined_mobile nav-item"
              : "logined_mobile vip nav-item"
          }
        >
          <div className="userIcon_mobile">
            <img
              className="user_icon"
              alt="user avatar"
              src="../Asset/user_ava.png"
            />
          </div>
          <div className="userIcon_info">
            <Link className="nav-link" to="/info">
              {obj.hoTen}
            </Link>
          </div>
        </li>
      );
    } else {
      return (
        <li className="nav-item">
          <Link className="mobileSignin_link" to="/login">
            <h5 className="mobile_content">Signin</h5>
          </Link>
        </li>
      );
    }
  }
  logout = () => {
    localStorage.clear("token");
    localStorage.removeItem("UserInfo");
    this.setState({ navigate: true });
  };
  render() {
    const home = JSON.parse(localStorage.getItem("UserHome"));
    return (
      <nav className="mobile_header">
        <div className="logo_mobile mobile">
          <Link className="logo-img" onClick={this.scrollToTop} to="/">
            <img
              className="img-fluid"
              src="https://www.upsieutoc.com/images/2020/03/14/logoMovies.png"
              alt="icons8-movie-ticket"
              border={0}
            />
          </Link>
        </div>
        <div className="container-mobileHeader">
          <div className={this.state.menuClass} onClick={this.handleClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>

          <div className={this.state.menu}>
            <ul className="navbar-nav">
              <div className="nav-login">{this.renderHTML()}</div>
              <div className="nav-content">
                <li className="nav-item">
                  <Link className="nav-link" onClick={this.scrollToMovie} to="">
                    Movie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={this.scrollToFooter}
                    to=""
                  >
                    Our partners
                  </Link>
                </li>
                {home ? (
                  <li className="nav-item">
                    <Link className="nav-link" onClick={this.logout} to="/">
                      Log out
                    </Link>
                  </li>
                ) : null}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
