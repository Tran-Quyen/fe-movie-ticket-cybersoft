import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserInformationTab from "../../Components/Home/UserPage/UserInformationTab";
import { connect } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Success from "../../Components/success";
import Fail from "../../Components/fail";
import * as Action from "../../Store/action/index";

const AvatarUser = () => (
  <div className="ava">
    <img alt="avatar" src="./Asset/user_ava.png" />
  </div>
);
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      fail: false,
    };
  }
  toggleError = () => {
    this.setState({
      error: true,
      fail: true,
    });
  };
  toggleFail = () => {
    this.setState({
      fail: false,
    });
  };
  componentDidMount() {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    if (UserHome) {
      let taiKhoan = UserHome.taiKhoan;
      this.props.getUserInformation({ taiKhoan });
    }
  }
  renderHTML = () => {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    return (
      <React.Fragment>
        {this.props.success === true ? <Success tab="Cập nhật" /> : null}
        {this.state.fail === true && this.state.error === true ? (
          <Fail tab={"Sai mật khẩu cũ"} fail={this.toggleFail} />
        ) : null}
        <div className="container info-user">
          <div className="info-cover">
            <div className="detail-info">
              <AvatarUser></AvatarUser>
              <div className="general">
                <h5>
                  {UserHome ? (
                    UserHome.hoTen
                  ) : (
                    <Skeleton animation="wave" variant="text" width="250px" />
                  )}
                </h5>
              </div>
            </div>
            <div className="info_gen desktop">
              <div className="col-sm-5 col-md-5 col-lg-5 mr-5 row justify-content-between topic-info_detail">
                <p>Tài khoản: </p>
                <span>
                  {UserHome ? (
                    UserHome.taiKhoan
                  ) : (
                    <Skeleton animation="wave" variant="text" width="100px" />
                  )}
                </span>
              </div>
              <div className="col-sm-3 col-md-5 col-lg-5 d-flex justify-content-between topic-info_detail2">
                <p>Mã nhóm: </p>
                <span>
                  {UserHome ? (
                    UserHome.maNhom
                  ) : (
                    <Skeleton animation="wave" variant="text" width="50px" />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="detail-info">
            <UserInformationTab error={this.toggleError} />
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return localStorage.getItem("UserHome") ? (
      <div>{this.renderHTML()}</div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  success: state.movieReducer.success,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInformation: (user) => {
      dispatch(Action.actLayThongTinUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Info);
