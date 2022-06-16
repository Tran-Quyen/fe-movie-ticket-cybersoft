import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "../../../Store/action";
import {  Alert, AlertTitle } from "@material-ui/lab/";
class ModalAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDt: "",
          hoTen: "",
          maNhom:"GP01"
        };
      }
      handleSumbitAddUser =async e => {
        if (this.state.maLoaiNguoiDung === "") {
          return (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              Chọn Người Dùng Trước
            </Alert>
          );
        } else {
          e.preventDefault();
          let user =this.state
          this.props.addUser(user);
          await this.props.getUserList()
        }
      };
      handleChangeAddUser = e => {
        let { name, value } = e.target;
        this.setState(
          {
            [name]: value,
          }
        );
      };
    
      chooseMLND = e => {
        this.setState({
            maLoaiNguoiDung: e.target.value
          }
        );
      };
    render() {
        return (
            <div id="myModalAdd" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <form onSubmit={this.handleSumbitAddUser}>
                    <div className="form-group">
                      <label htmlFor="">Tài Khoản</label>
                      <input
                        type="text"
                        className="form-control"
                        name="taiKhoan"
                        onChange={this.handleChangeAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="matKhau"
                        onChange={this.handleChangeAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Họ Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        onChange={this.handleChangeAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={this.handleChangeAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Số Điện Thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soDt"
                        onChange={this.handleChangeAddUser}
                      />
                    </div>

                    <div className="form-group choiceTypeUser">
                      <label>Mã Loại Người Dùng:</label>
                      <select 
                      onChange={this.chooseMLND}
                      >
                        <option value="">Mời Bạn Chọn</option>
                        <option value="KhachHang">Khách Hàng</option>
                        <option value="QuanTri">Quản Trị</option>
                      </select>
                    </div>
                    <button type="submit" className="SumbitAddUser">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btnCloseAddUser"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
        </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(action.actGetUserList());
    },
    addUser: user => {
      dispatch(action.actThemNguoiDung(user));
    }
  };
};
export default connect(null,mapDispatchToProps)(ModalAddUser)