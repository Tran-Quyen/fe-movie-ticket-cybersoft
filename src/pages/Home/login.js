import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Success from "../../Components/success";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import * as action from "../../Store/action";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SVGAdminLogin from "../../Asset/SVG/userLoginImage";
import Fail from "../../Components/fail";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        taiKhoan: "",
        matKhau: ""
      },
      errors: {
        taiKhoan: "",
        matKhau: ""
      },
      input1: "input-div",
      input2: "input-div",
      taiKhoan: "",
      matKhau: "",
      formvalid: false,
      tkValid: false,
      mkValid: false,
      show: faEye,
      type: "password",
      fail: false
    };
  }
  handleClick = e => {
    e.target.name === "taiKhoan"
      ? this.setState({
          input1: "input-div focus"
        })
      : this.setState({
          input2: "input-div focus"
        });
  };
  handleBlur = e => {
    if (e.target.value === "") {
      e.target.name === "taiKhoan"
        ? this.setState({
            input1: "input-div"
          })
        : this.setState({
            input2: "input-div"
          });
    }
    let { name, value } = e.target;
    let message =
      value === ""
        ? (name === "taiKhoan" ? "Tài khoản" : "Mật khẩu") + " không được rỗng"
        : "";

    let { tkValid, mkValid } = this.state;
    switch (name) {
      case "taiKhoan":
        tkValid = message ? false : true;
        if (value && value.length < 4) {
          tkValid = false;
          message = "Độ dài chuỗi phải lớn hơn 4";
        }
        break;
      case "matKhau":
        mkValid = message ? false : true;
        break;
      default:
        message = "Invalid";
        break;
    }

    this.setState({
      errors: { ...this.state.errors, [name]: message },
      tkValid,
      mkValid
    });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
    let message = value === null;
    let { tkValid, mkValid } = this.state;
    switch (name) {
      case "taiKhoan":
        tkValid = message ? false : true;
        // kiểm tra ký tự
        if (value && value.length < 4) {
          tkValid = false;
          message = "Độ dài chuỗi phải lớn hơn 4";
        }
        break;
      case "matKhau":
        mkValid = message ? false : true;
        break;
      default:
        message = "Invalid";
        break;
    }
    this.setState(
      {
        values: { ...this.state.values, [name]: value },
        errors: { ...this.state.errors, [name]: message },
        tkValid,
        mkValid
      },
      () => {
        this.handleFormValid();
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  handleFormValid = () => {
    this.setState({
      formvalid: this.state.tkValid && this.state.mkValid
    });
  };
  handleShowPassword = e => {
    e.target.classList.toggle("hide");
    if (
      e.target.classList.value ===
        "svg-inline--fa fa-eye fa-w-18 PassIcon hide" ||
      e.target.classList.value === "hide"
    ) {
      this.setState({
        type: "text",
        show: faEyeSlash
      });
    } else {
      this.setState({
        type: "password",
        show: faEye
      });
    }
  };
  handleError = () => {
    this.setState({
      fail: true
    });
  };
  toggleError = () => {
    this.setState({
      fail: false
    });
  };
  renderSuccess = loginedstt => {
    return loginedstt === 200 ? <Success tab={"Đăng nhập"} /> : null;
  };
  renderError = loginedstt => {
    if (
      this.state.fail === true &&
      this.props.errorData &&
      loginedstt !== 200
    ) {
      return <Fail tab={this.props.errorData} fail={this.toggleError} />;
    }
  };
  renderHTML = () => {
    return (
      <div className="login-wrapper">
        {this.renderSuccess(this.props.loginedstt)}
        {this.renderError(this.props.loginedstt)}
        <div className=" login-container ">
          <div className="col-sm-6 login_img desktop">
            <SVGAdminLogin />
          </div>
          <div className="formDangNhap">
            <h3>Đăng nhập</h3>
            <form onSubmit={this.handleSubmit}>
              <div
                className={this.state.input1}
                onFocus={this.handleClick}
                onBlur={this.handleBlur}
              >
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="input-user">
                  <h5>UserName</h5>
                  <input
                    type="text"
                    className="input"
                    name="taiKhoan"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {this.state.errors.taiKhoan ? (
                <div className="warning-text" style={{ color: "red" }}>
                  {this.state.errors.taiKhoan}
                </div>
              ) : (
                ""
              )}
              <div
                className={this.state.input2}
                onFocus={this.handleClick}
                onBlur={this.handleBlur}
              >
                <div className="i">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div className="input-user">
                  <h5>Password</h5>
                  <div className="inputAr">
                    <input
                      className="input"
                      type={this.state.type}
                      name="matKhau"
                      onChange={this.handleChange}
                    />
                    {this.state.matKhau ? (
                      <FontAwesomeIcon
                        className="PassIcon"
                        icon={this.state.show}
                        onClick={this.handleShowPassword}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              {this.state.errors.matKhau ? (
                <div className="warning-text" style={{ color: "red" }}>
                  {this.state.errors.matKhau}
                </div>
              ) : (
                ""
              )}
              <div className="signUp_link">
                <span>
                  Chưa có tài khoản? <Link to="/sign-up">Đăng ký</Link>
                </span>
              </div>

              <div className="btnAction">
                <button
                  className="btn signin-btn"
                  onClick={this.handleError}
                  disabled={!this.state.formvalid}
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const id = JSON.parse(localStorage.getItem("DetailId"));
    if (localStorage.getItem("UserHome")) {
      return <Redirect to="/" />;
    }
    return <div> {this.renderHTML()}</div>;
  }
}
const mapStateToProps = state => ({
  loginedstt: state.movieReducer.loginedstt,
  test: state.movieReducer.test,
  errorData: state.movieReducer.errorData
});
const mapDispatchToProps = dispatch => {
  return {
    login: (user, history) => {
      dispatch(action.actLoginHome(user, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
