import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../../Store/action/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
class TabUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      matKhauCu: "",
      count: "checkCount",
      upper: "checkUppercase",
      number: "checkNumber"
    };
  }
  handleSubmit = e => {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    e.preventDefault();
    let updatedUser = { ...this.state };
    let taiKhoan = this.state.taiKhoan;
    if (
      this.state.matKhauCu === UserInfo.matKhau &&
      this.state.count === "checkCount checked" &&
      this.state.upper === "checkUppercase checked" &&
      this.state.number === "checkNumber checked" &&
      this.state.matKhauCu !== this.state.matKhau
    ) {
      this.props.updateUser(updatedUser);
    }

    this.setState(
      {
        ...this.state
      },
      () => {
        this.props.getUserInformation({ taiKhoan });
      }
    );
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
  componentDidMount() {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    let taiKhoan = UserHome.taiKhoan;
    this.props.getUserInformation({ taiKhoan });
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    if (UserInfo && UserHome) {
      this.setState({
        taiKhoan: UserInfo.taiKhoan,
        matKhau: UserInfo.matKhau,
        email: UserInfo.email,
        soDt: UserInfo.soDT,
        hoTen: UserInfo.hoTen,
        maNhom: UserHome.maNhom,
        maLoaiNguoiDung: UserHome.maLoaiNguoiDung
      });
    }
  }
  render() {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    return (
      <>
        <form className="updateUser" onSubmit={this.handleSubmit}>
          <h4>Đổi mật khẩu </h4>
          <hr />
          <div className="form-group">
            <label>Mật khẩu cũ:</label>
            <input
              type="password"
              className="form-control"
              name="matKhauCu"
              onChange={this.handleChange}
              placeholder="Nhập Password"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              className="form-control"
              name="matKhau"
              onChange={this.handleChangeMatKhau}
              placeholder="Nhập Password"
            />
            <div className="passwordCheck">
              <div className={this.state.count}>
                <FontAwesomeIcon icon={faCheck} />
                <p>Mật khẩu có ít nhất 4 kí tự</p>
              </div>
              <div className={this.state.upper}>
                <FontAwesomeIcon icon={faCheck} />
                <p>Mật khẩu có ít nhất 1 kí tự in hoa</p>
              </div>
              <div className={this.state.number}>
                <FontAwesomeIcon icon={faCheck} />
                <p>Mật khẩu có ít nhất 1 số</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btnUpdate"
            onClick={
              UserInfo
                ? this.state.matKhauCu !== UserInfo.matKhau
                  ? this.props.error
                  : ""
                : ""
            }
          >
            Cập nhật
          </button>
        </form>
      </>
    );
  }
}
const mapStateToProps = state => ({
  userInformation: state.movieReducer.userInformation
});
const mapDispatchToProps = dispatch => {
  return {
    getUserInformation: user => {
      dispatch(Action.actLayThongTinUser(user));
    },
    updateUser: user => {
      dispatch(Action.actUpdateUserInformation(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabUpdateUser);
