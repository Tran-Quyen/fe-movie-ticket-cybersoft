import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as Action from "../../Store/action/index";
import { connect } from "react-redux";
import UserImage from "../../Asset/SVG/UserImage";
import Skeleton from '@material-ui/lab/Skeleton';
class Info extends Component {
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
      maLoaiNguoiDung: ""
    };
  }
  componentDidMount() {
      let UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
      let taiKhoan = UserAdmin.taiKhoan;
      this.props.getUserInformation({taiKhoan});
      if(this.props.userInformation &&JSON.parse(localStorage.getItem("UserInfo"))){
      let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
          this.setState({
            taiKhoan,
            matKhau:UserInfo.matKhau,
            email:UserInfo.email,
            soDt:UserInfo.soDT,
            hoTen:UserInfo.hoTen,
            maNhom:UserAdmin.maNhom,
            maLoaiNguoiDung:UserAdmin.maLoaiNguoiDung
          });
      }
  }

  handleChange = e => {
    let {name,value}= e.target
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let updatedUser = { ...this.state };
    this.props.updateUser(updatedUser);
    let UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
    let taiKhoan = UserAdmin.taiKhoan;
    this.props.getUserInformation({taiKhoan});
  };

  renderHTML = () => {
    let {userInformation} =this.props
    return (
      <div
        className="info--admin"
        style={{ backgroundColor: "white", opacity: "1" }}
      >
        <h1 className="h1-admin" style={{fontWeight:"700"}}>THÔNG TIN TÀI KHOẢN</h1>
        <div className="container row d-flex">
          <div className="avatar col-md-4 ">
            <UserImage />
          </div>
          <div className="info col-md-8">
            <div className="comp">
              <p>
                Tài Khoản:<span>{userInformation ? userInformation.taiKhoan : <Skeleton variant="text" width="250px" />}</span>
              </p>
            </div>
            <div className="comp ">
              <p>
                Mật Khẩu:<span>{userInformation ? userInformation.matKhau : <Skeleton variant="text" width="250px" />}</span>
              </p>
            </div>
            <div className="comp">
              <p>
                Họ và tên:<span>{userInformation ? userInformation.hoTen : <Skeleton variant="text" width="250px" />}</span>
              </p>
            </div>
            <div className="comp">
              <p>
                Email: <span>{userInformation ? userInformation.email : <Skeleton variant="text" width="250px" />}</span>
              </p>
            </div>
            <div className="comp ">
              <p>
                Số điện thoại:<span>{userInformation ? userInformation.soDT : <Skeleton variant="text" width="250px" />}</span>
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-update-admin "
                data-toggle="modal"
                data-target="#myModal1"
                onClick={this.handleClick}
              >
                CHỈNH SỬA TÀI KHOẢN
              </button>
              <div className="modal" id="myModal1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* Modal body */}
                    <div className="modal-body">
                    <button
                        type="button"
                        className="close btn-cancel"
                        data-dismiss="modal"
                      >
                        <span>x</span>
                      </button>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <label>Họ Tên:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="hoTen"
                            value={this.state.hoTen}
                            onChange={this.handleChange}
                            placeholder="Nhập Họ và Tên"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            name="matKhau"
                            value={this.state.matKhau}
                            onChange={this.handleChange}
                            placeholder="Nhập Password"
                          />
                        </div>
                        <div className="form-group">
                          <label>Số Điện Thoại:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="soDt"
                            value={this.state.soDt}
                            onChange={this.handleChange}
                            placeholder="Nhập số điện thoại"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Nhập Email"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-update"
                        >
                          Cập nhật
                        </button>
                        
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return localStorage.getItem("UserAdmin") ? (
      <div>{this.renderHTML()}</div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = state => ({
  userInformation: state.movieReducer.userInformation,
  loading: state.movieReducer.loading
});
const mapDispatchToProps = dispatch => {
  return {
    getUserInformation: user => {
      dispatch(Action.actLayThongTinUser(user));
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    },
    updateUser: user => {
      dispatch(Action.actUpdateUserAdminInformation(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Info);
