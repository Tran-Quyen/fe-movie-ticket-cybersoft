import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import TimeofMovie from "./TimeofMovie";
const { TabPane } = Tabs;
class DayofMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPhim: "",
      ngayChieu: ""
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.idPhim !== "") {
      this.setState(
        {
          idPhim: this.props.id
        },
        () => this.renderNgayChieu()
      );
    }
  }
  componentWillUnmount() {
    return this.renderNgayChieu();
  }
  handleChange = e => {
    this.setState({
      ngayChieu: e
    });
  };
  renderNgayChieu() {
    if (this.props.movieDate) {
      let ngayChieu = this.props.movieDate.heThongRapChieu;
      const renderNgayChieu = _.filter(ngayChieu, {
        maHeThongRap: this.props.maRap
      });
      if (renderNgayChieu.length === 0) {
        return (
          <div className="detail-movie-schedule-error">
            <span>Hiện không có lịch chiếu cho phim này</span>
          </div>
        );
      } else {
        return (renderNgayChieu.length !== 0 && typeof renderNgayChieu) ===
          "object"
          ? Object.keys(renderNgayChieu).map((value, index) => {
              return (
                <React.Fragment key={index}>
                  {" "}
                  {Object.keys(renderNgayChieu[value].cumRapChieu).map(
                    (item1, indexTheater) => {
                      const objLichChieu =
                        renderNgayChieu[value].cumRapChieu[item1].lichChieuPhim;
                      const filteredArr = objLichChieu.reduce(
                        (arrayDuplicated, current) => {
                          const duplicatedItem = arrayDuplicated.find(
                            movie =>
                              new Date(
                                movie.ngayChieuGioChieu
                              ).toLocaleDateString() ===
                              new Date(
                                current.ngayChieuGioChieu
                              ).toLocaleDateString()
                          );
                          if (!duplicatedItem) {
                            return arrayDuplicated.concat([current]);
                          } else {
                            return arrayDuplicated;
                          }
                        },
                        []
                      );
                      return (
                        <Tabs
                          size="large"
                          key={indexTheater}
                          onChange={this.handleChange}
                          defaultActiveKey="1"
                          tabPosition={"top"}
                          style={{ transform: `translate(0px, 0px)` }}
                        >
                          {Object.keys(filteredArr).map(
                            (dateMovie, indexDateMovie) => {
                              let time = new Date(
                                filteredArr[dateMovie].ngayChieuGioChieu
                              ).toLocaleDateString();
                              let defaultTime = new Date(
                                filteredArr[0].ngayChieuGioChieu
                              ).toLocaleDateString();
                              return (
                                <TabPane key={time} tab={time}>
                                  <h5 className="ml-2 detailMovie--tenRap">
                                    {filteredArr[dateMovie].tenRap}
                                  </h5>
                                  <TimeofMovie
                                    LichChieu={objLichChieu}
                                    defaultTime={defaultTime}
                                    ngayChieu={this.state.ngayChieu}
                                  />
                                </TabPane>
                              );
                            }
                          )}
                        </Tabs>
                      );
                    }
                  )}
                </React.Fragment>
              );
            })
          : null;
      }
    }
  }
  render() {
    return <div>{this.renderNgayChieu()}</div>;
  }
}
const mapStateToProps = state => ({
  movieDate: state.movieReducer.movieDate
});

export default connect(mapStateToProps, null)(DayofMovie);
