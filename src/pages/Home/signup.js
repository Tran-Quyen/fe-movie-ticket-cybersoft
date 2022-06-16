import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPhone,
  faEnvelope,
  faGlobe,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as action from "../../Store/action";
import Success from "../../Components/success";
import Fail from "../../Components/fail";

const SignUpImage = props => (
  <div className=" signup-img">
    <img
      alt="hinhAnh123"
      src="https://cdn.jotfor.ms/images/podo-login-signup.png"
    />
    <p>{props.noti}</p>
  </div>
);

const FormSignUp = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="form-wrapper">
      <div className="signup-formLeft">
        <div className="input-div signup">
          <div className="i">
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className="input-user">
            <input
              type="text"
              className="input"
              name="taiKhoan"
              placeholder="Nhập UserName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </div>
        </div>
        <div className="input-div signup">
          <div className="i ">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div>
            <input
              className="input"
              type="password"
              name="matKhau"
              placeholder="Nhập Mật Khẩu"
              onChange={props.handleChangeMatKhau}
              onBlur={props.handleBlur}
            />
          </div>
        </div>
        {props.matKhau !== "" ? (
          <div className="passwordCheck">
            <div className={props.count}>
              <FontAwesomeIcon icon={faCheck} />
              <p>Mật khẩu có ít nhất 4 kí tự</p>
            </div>
            <div className={props.upper}>
              <FontAwesomeIcon icon={faCheck} />
              <p>Mật khẩu có ít nhất 1 kí tự in hoa</p>
            </div>
            <div className={props.number}>
              <FontAwesomeIcon icon={faCheck} />
              <p>Mật khẩu có ít nhất 1 số</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="signup-formRight">
        <div className="input-div signup">
          <div className="i">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="input-user">
            <input
              type="text"
              className="input"
              name="hoTen"
              placeholder="Nhập đầy đủ họ tên"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </div>
        </div>
        <div className="input-div signup">
          <div className="i">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="input-user">
            <input
              type="text"
              className="input"
              name="soDT"
              placeholder="Nhập số điện thoại"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </div>
        </div>
        <div className="input-div signup">
          <div className="i">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="input-user">
            <input
              type="text"
              className="input"
              name="email"
              placeholder="Nhập email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </div>
        </div>
      </div>
    </div>
    <p className="mobile_noti">{props.noti}</p>
    <button className="btn signup-btn" onClick={props.errorData}>
      SIGN UP
    </button>
  </form>
);

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        email: ""
      },
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      email: "",
      tkValid: false,
      mkValid: false,
      tenValid: false,
      dtValid: false,
      emailValid: false,
      noti: "Chào bạn, điền đầy đủ thông tin vào form nhé",
      fail: false,
      count: "checkCount",
      upper: "checkUppercase",
      number: "checkNumber"
    };
  }

  handleBlur = e => {
    let { name, value } = e.target;
    let { tkValid, mkValid, tenValid, dtValid, emailValid } = this.state;
    let message = value === "";
    switch (name) {
      case "taiKhoan":
        message = value === "" ? "Tài khoản không được rỗng nha" : "";
        tkValid = message ? false : true;
        if (value && value.length < 8) {
          tkValid = false;
          message = "Tên tài khoản phải có it nhất 8 kí tự bạn nha";
        }
        break;
      case "matKhau":
        message = value === "" ? "Mật khẩu không được rỗng nha" : "";
        break;
      case "hoTen":
        message = value === "" ? "Họ tên không được rỗng nha" : "";
        tenValid = message ? false : true;
        if (value && value.length < 4) {
          tenValid = false;
          message = "Độ dài chuỗi phải có it nhất 4 kí tự";
        }
        break;
      case "soDT":
        message = value === "" ? "Số điện thoại không được rỗng nha" : "";
        dtValid = message ? false : true;
        if (value && value.length < 11) {
          dtValid = false;
          message = "Độ dài số điện thoại phải có it nhất 10 kí tự";
        }
        break;
      case "email":
        message = value === "" ? "email không được rỗng nha" : "";
        emailValid = message ? false : true;
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          emailValid = false;
          message = "Điền đúng định dạng email đi kìa bạn ơi";
        }
        break;
      default:
        message = "not valid";
        break;
    }
    this.setState({
      errors: { ...this.state.errors, [name]: message },
      tkValid,
      mkValid,
      tenValid,
      dtValid,
      emailValid
    });

    if (message !== "") {
      this.setState({
        noti: message
      });
    } else {
      this.setState({
        noti: "OK ^.^"
      });
    }
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };
  handleChangeMatKhau = e => {
    let target = e.target;
    let value = target.value;
    let checkUpper = "(?=.*[A-Z])";
    let checkNumber = "[0-9]";
    this.setState(
      {
        matKhau: value
      },
      () => {
        this.state.matKhau.length >= 4
          ? this.setState({
              count: "checkCount checked"
            })
          : this.setState({
              count: "checkCount"
            });
        if (this.state.matKhau.match(checkUpper)) {
          this.setState({
            upper: "checkUppercase checked"
          });
        } else {
          this.setState({
            upper: "checkUppercase"
          });
        }
        if (this.state.matKhau.match(checkNumber)) {
          this.setState({
            number: "checkNumber checked"
          });
        } else {
          this.setState({
            number: "checkNumber"
          });
        }
      }
    );
  };
  handleSubmit = e => {
    e.preventDefault();
    let user = { ...this.state };
    let { tkValid, mkValid, dtValid, tenValid, emailValid } = this.state;
    user.maNhom = "GP01";
    user.maLoaiNguoiDung = "KhachHang";
    if (
      (tkValid,
      mkValid,
      dtValid,
      tenValid,
      emailValid === true &&
        this.state.upper === "checkUppercase checked" &&
        this.state.count === "checkCount checked" &&
        this.state.number === "checkNumber checked")
    ) {
      this.props.signup(user, this.props.history);
    } else if ((tkValid, mkValid, dtValid, tenValid, emailValid === false)) {
      this.setState({
        noti: "Vui lòng điền đầy đủ thông tin"
      });
    } else if (
      this.state.upper === "checkUppercase" ||
      this.state.count === "checkCount" ||
      this.state.number === "checkNumber"
    ) {
      this.setState({
        noti: "Vui lòng điền đúng định dạng mật khẩu"
      });
    }
  };
  handleError = () => {
    if (
      this.state.upper === "checkUppercase checked" &&
      this.state.count === "checkCount checked" &&
      this.state.number === "checkNumber checked"
    ) {
      this.setState({
        fail: true
      });
    }
  };
  toggleError = () => {
    this.setState({
      fail: false
    });
  };
  renderError = signuped => {
    return this.state.fail === true &&
      this.props.errorSignup &&
      signuped !== 200 ? (
      <Fail tab={this.props.errorSignup} fail={this.toggleError} />
    ) : null;
  };
  renderSuccess = signuped => {
    return signuped === 200 ? <Success tab={"Đăng ký"} /> : null;
  };
  renderHTML = () => {
    return (
      <div>
        {this.renderSuccess(this.props.signuped)}

        {this.renderError(this.props.signuped)}
        <div className="signup-container">
          <div className="signup-content align-items-center">
            <SignUpImage noti={this.state.noti}></SignUpImage>
            <div className="signUp-form">
              <h4>Đăng ký</h4>
              <FormSignUp
                errorData={this.handleError}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleChangeMatKhau={this.handleChangeMatKhau}
                noti={this.state.noti}
                count={this.state.count}
                upper={this.state.upper}
                number={this.state.number}
                handleBlur={this.handleBlur}
                matKhau={this.state.matKhau}
              ></FormSignUp>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderHTML()}</div>;
  }
}
const mapStateToProps = state => ({
  signuped: state.movieReducer.signuped,
  errorSignup: state.movieReducer.errorSignup
});
const mapDispatchToProps = dispatch => {
  return {
    signup: (user, history) => {
      dispatch(action.actSignupHome(user, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
