import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../Store/action/index";
import LoginAdminSVG from "../../Asset/SVG/loginAdminSVG";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: ""
    };
  }
  handleOnChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.Login(this.state, this.props.history);
  };
  render() {
    return (
      <div className="container adminLoginPage d-flex">
        <LoginAdminSVG />
        <div className="col-sm-6 mx-auto">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="form-control"
                name="taiKhoan"
                placeholder="Mời bạn nhập tên tài khoản"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form-control"
                name="matKhau"
                placeholder="Mời bạn nhập mật khẩu"
                onChange={this.handleOnChange}
              />
            </div>
            <button type="submit" className="btn btnAdminlogin">
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    Login: (user, history) => {
      dispatch(Action.actLoginAdmin(user, history));
    }
  };
};
export default connect(null, mapDispatchToProps)(Admin);
