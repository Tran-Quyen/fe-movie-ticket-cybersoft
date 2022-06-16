import React, { Component } from "react";
import * as Action from "../../../Store/action/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DanhSachRap = props => (
  <select
    className="form-control selectChoice"
    onChange={props.handlingChangeTheater}
  >
    <option>Chọn Rạp</option>
    {props.renderDanhSachRap()}
  </select>
);
const DanhSachPhim = props => (
  <select
    value={props.movieName}
    className="form-control selectChoice"
    onChange={props.handleChangeListMovie}
  >
    <option>Chọn phim </option>
    {props.renderDanhSachPhim()}
  </select>
);
const DanhSachNgayXem = props => (
  <select
    className="form-control selectChoice"
    onChange={props.handleChangeDay}
  >
    <option>Ngày Xem</option>
    {props.renderDanhSachRap() ? props.renderNgayXem() : null}
  </select>
);
const DanhSachLichChieu = props => (
  <select
    className="form-control selectChoice"
    onChange={props.handleChangeTime}
  >
    <option>Suất Chiếu</option>
    {props.renderNgayXem() ? props.renderGioChieu() : null}
  </select>
);
class HomeTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      maCumRap: "",
      ngayChieu: [],
      maPhim: "",
      maLichChieu: ""
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }
  UNSAFE_componentWillMount() {
    return this.props.movieDate;
  }
  renderDanhSachPhim = () => {
    return this.props.listMovie.map((MovieList, index) => {
      return (
        <option key={index} value={MovieList.maPhim}>
          {" "}
          {MovieList.tenPhim}
        </option>
      );
    });
  };
  renderDanhSachRap = () => {
    if (this.props.movieDate.heThongRapChieu) {
      return this.props.movieDate.heThongRapChieu.map(
        (heThongRapChieu, index) => {
          return heThongRapChieu.cumRapChieu.map((cumRapChieu, index) => {
            return (
              <React.Fragment key={index}>
                <option value={cumRapChieu.maCumRap}>
                  {cumRapChieu.tenCumRap}
                </option>
              </React.Fragment>
            );
          });
        }
      );
    }
    if (this.state.id !== "") {
      this.props.getMovieDateTime(this.state.id);
    }
  };
  renderNgayXem = () => {
    let error;
    if (this.props.movieDate.heThongRapChieu) {
      return this.props.movieDate.heThongRapChieu.map(
        (heThongRapChieu, index) => {
          return heThongRapChieu.cumRapChieu.map((cumRapChieu, index) => {
            if (cumRapChieu.maCumRap === this.state.maCumRap) {
              const filteredArr = cumRapChieu.lichChieuPhim.reduce(
                (arrayDuplicated, current) => {
                  const duplicatedItem = arrayDuplicated.find(
                    movie =>
                      new Date(movie.ngayChieuGioChieu).toLocaleDateString() ===
                      new Date(current.ngayChieuGioChieu).toLocaleDateString()
                  );
                  return !duplicatedItem
                    ? arrayDuplicated.concat([current])
                    : arrayDuplicated;
                },
                []
              );
              return (
                <React.Fragment key={index}>
                  {Object.keys(filteredArr).map((dateMovie, indexDateMovie) => {
                    return (
                      <option key={dateMovie}>
                        {new Date(
                          filteredArr[dateMovie].ngayChieuGioChieu
                        ).toLocaleDateString()}
                      </option>
                    );
                  })}
                </React.Fragment>
              );
            }
            return error;
          });
        }
      );
    }
  };
  renderGioChieu = () => {
    let error;
    if (this.props.movieDate.heThongRapChieu) {
      return this.props.movieDate.heThongRapChieu.map(
        (heThongRapChieu, index) => {
          return heThongRapChieu.cumRapChieu.map((cumRapChieu, index) => {
            if (cumRapChieu.maCumRap === this.state.maCumRap) {
              const filteredArr = cumRapChieu.lichChieuPhim.reduce(
                (arrayDuplicated, current) => {
                  const duplicatedItem = arrayDuplicated.find(
                    movie =>
                      new Date(movie.ngayChieuGioChieu).toLocaleTimeString() ===
                      new Date(current.ngayChieuGioChieu).toLocaleTimeString()
                  );
                  return !duplicatedItem
                    ? arrayDuplicated.concat([current])
                    : arrayDuplicated;
                },
                []
              );
              return (
                <React.Fragment key={index}>
                  {Object.keys(filteredArr).map((dateMovie, indexDateMovie) => {
                    return (
                      <option
                        value={filteredArr[dateMovie].maLichChieu}
                        key={dateMovie}
                      >
                        {new Date(
                          filteredArr[dateMovie].ngayChieuGioChieu
                        ).toLocaleTimeString()}
                      </option>
                    );
                  })}
                </React.Fragment>
              );
            }
            return error;
          });
        }
      );
    }
  };
  handleChangeListMovie = event => {
    this.setState(
      {
        id: event.target.value
      },
      () => {
        this.props.getMovieDateTime(this.state.id);
      }
    );
  };
  handlingChangeTheater = event => {
    this.setState({
      maCumRap: event.target.value
    });
  };
  handleChangeDay = e => {
    this.setState({
      ngayChieu: e.target.value
    });
  };
  handleChangeTime = e => {
    const maLichChieu = parseInt(e.target.value);
    this.setState({
      maLichChieu
    });
  };
  render() {
    return (
      <div className="wrapper home-tool desktop">
        <DanhSachPhim
          movieName={this.movieName}
          handleChangeListMovie={this.handleChangeListMovie}
          renderDanhSachPhim={this.renderDanhSachPhim}
        ></DanhSachPhim>
        <DanhSachRap
          handlingChangeTheater={this.handlingChangeTheater}
          renderDanhSachRap={this.renderDanhSachRap}
        ></DanhSachRap>
        <DanhSachNgayXem
          handleChangeDay={this.handleChangeDay}
          renderDanhSachRap={this.renderDanhSachRap}
          renderNgayXem={this.renderNgayXem}
        ></DanhSachNgayXem>
        <DanhSachLichChieu
          handleChangeTime={this.handleChangeTime}
          renderNgayXem={this.renderNgayXem}
          renderGioChieu={this.renderGioChieu}
        ></DanhSachLichChieu>
        {this.state.maLichChieu ? (
          <Link className="btn-datve" to={`/dat-ve/${this.state.maLichChieu}`}>
            Mua vé ngay
          </Link>
        ) : (
          <Link className="btn-datve" disabled to={"/"}>
            Mua vé ngay
          </Link>
        )}
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  listMovie: state.movieReducer.listMovie,
  movieDate: state.movieReducer.movieDate
});
const mapDispatchToProps = dispatch => {
  return {
    getMovieDateTime: ve => {
      dispatch(Action.actGetDateTimeMovie(ve));
    }
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(HomeTool);
