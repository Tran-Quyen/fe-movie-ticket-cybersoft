import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as Action from "../../Store/action/index";
import TableHeadTicket from "../../Components/Admin/TableandSideBar/TableHeadTicket";
class TicketManageMent extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      movieData: []
    };
  }
  componentDidMount() {
    const taiKhoan = this.props.match.params.id;
    this.props.getTicketManageUser({ taiKhoan });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.tickets.taiKhoan !== "") {
      let UserTicket = nextProps.tickets;
      const User = _.groupBy(UserTicket.thongTinDatVe, "ngayDat");
      this.setState({
        movieData: User
      });
    }
  }
  render() {
    let UserData = this.state.movieData;
    return (
      <div className="container-table100" style={{ width: "100%" }}>
        <div className="wrap-table100">
          <div className="table100 ver2 m-b-110">
            <TableHeadTicket />
            {Object.keys(UserData).map((value, index) => (
              <div key={index}>
                {typeof _.groupBy(UserData[value], "ngayDat") == "object" ? (
                  <div>
                    {Object.keys(_.groupBy(UserData[value], "ngayDat")).map(
                      (item2, index2) => {
                        let user = _.groupBy(UserData[value], "ngayDat")[item2][
                          index2
                        ];
                        return typeof user.danhSachGhe == "object" ? (
                          <div key={index2}>
                            {Object.keys(user.danhSachGhe).map(
                              (item3, index3) => {
                                return (
                                  <div key={index3}>
                                    <div className="table100-body js-pscroll">
                                      <table>
                                        <tbody>
                                          <tr className="row100 body">
                                            <td className="cell100 column1">
                                              {user.tenPhim}
                                            </td>
                                            <td className="cell100 column2">
                                              {new Date(
                                                user.ngayDat
                                              ).toLocaleDateString()}
                                              .
                                            </td>
                                            <td className="cell100 column3">
                                              {" "}
                                              {
                                                user.danhSachGhe[item3]
                                                  .tenHeThongRap
                                              }
                                            </td>
                                            <td className="cell100 column4">
                                              {" "}
                                              {user.danhSachGhe[item3].tenRap}
                                            </td>
                                            <td className="cell100 column5">
                                              {" "}
                                              {user.danhSachGhe[item3].tenGhe}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        ) : null;
                      }
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tickets: state.movieReducer.tickets
});
const mapDispatchToProps = dispatch => {
  return {
    getTicketManageUser: user => {
      dispatch(Action.actQuanLyVeUser(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketManageMent);
