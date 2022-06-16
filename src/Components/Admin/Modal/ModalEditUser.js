import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/action";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01"
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.idUser !== "") {
      let user = nextProps.userInformation;
      this.setState({
        maLoaiNguoiDung: nextProps.typeUser,
        taiKhoan: nextProps.idUser,
        matKhau: user.matKhau,
        email: user.email,
        soDt: user.soDT,
        hoTen: user.hoTen,
        maNhom: "GP01"
      });
    }
  }
  handleClose = e => {
    this.props.getUserList()
  };
  handleChangeEdit = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmitEdit = async e => {
    e.preventDefault();
    let user = this.state;
    await this.props.updateUserAdminOnly(user);
  };
  render() {
    let user = this.state
    return (
      <div id="myModal" className="modal modalEditUser fade" data-backdrop="static" data-keyboard="false" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={this.handleSubmitEdit}>
                <div className="form-group">
                  <label>Tài Khoản:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="taiKhoan"
                    value={user.taiKhoan || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập Họ và Tên"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Họ Tên:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoTen"
                    value={user.hoTen || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập Họ và Tên"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="matKhau"
                    autoComplete="password"
                    value={user.matKhau || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập Password"
                  />
                </div>
                <div className="form-group">
                  <label>Số Điện Thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="soDt"
                    value={user.soDt || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="form-group choiceTypeUser">
                      <label>Mã Loại Người Dùng:</label>
                      <select 
                      name="maLoaiNguoiDung"
                      onChange={this.handleChangeEdit}
                      >
                        <option value="">Mời Bạn Chọn</option>
                        <option value="KhachHang">Khách Hàng</option>
                        <option value="QuanTri">Quản Trị</option>
                      </select>
                    </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập Email"
                  />
                </div>
                <button type="submit" className="btn btn-update btnADDEdit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btnCloseEditUser"
                  data-dismiss="modal"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInformation: state.movieReducer.userInformation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateUserAdminOnly: tk => {
      dispatch(action.actUpdateUserAdminOnly(tk));
    },
    getUserList: () => {
      dispatch(action.actGetUserList());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
